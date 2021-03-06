using System.Security.Cryptography;
using System.Text;
using api.Data;
using api.DTOS;
using api.Entities;
using api.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly DataContext _context;
        private readonly ITokenService _tokenService;
        public AccountController(DataContext context, ITokenService tokenService)
        {
            _tokenService = tokenService;
            _context = context;

        }

        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerdto)
        {


            if (await UserExists(registerdto.Username)) return BadRequest("username already takenn");

            using var hmac = new HMACSHA512();


            var user = new AppUser
            {
                UserName = registerdto.Username.ToLower(),
                PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerdto.Password)),
                PasswordSalt = hmac.Key
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return new UserDto
            {
                Username=user.UserName,
               Token=_tokenService.CreateToken(user)
            };
       

        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {

            var user = await _context.Users.SingleOrDefaultAsync(x => x.UserName == loginDto.username);

            if (user == null) return Unauthorized("Invalid Username");

            using var hmac = new HMACSHA512(user.PasswordSalt);

            var computedhash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.password));

            for (int i = 0; i < computedhash.Length; i++)
            {
                if (computedhash[i] != user.PasswordHash[i])
                    return Unauthorized("Invalid password");
            }

            return new UserDto
            {
                Username=user.UserName,
               Token=_tokenService.CreateToken(user)
            };
        }

        private async Task<bool> UserExists(string username)
        {
            return await _context.Users.AnyAsync(x => x.UserName == username.ToLower());
        }


    }
}