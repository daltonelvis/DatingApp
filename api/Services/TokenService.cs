using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using api.Entities;
using api.Interfaces;
using Microsoft.IdentityModel.Tokens;

namespace api.Services
{
    public class TokenService : ITokenService
    {

        private readonly SymmetricSecurityKey _key;
        public TokenService(IConfiguration config)
        {
            _key=new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["TokenKey"]));

        }

        public string CreateToken(AppUser user)
        {
            var Claims=new List<Claim>
            {

                new Claim(JwtRegisteredClaimNames.NameId,user.UserName)
            };

            var creds= new SigningCredentials(_key,SecurityAlgorithms.HmacSha512Signature);

            var tokendescriptor=new SecurityTokenDescriptor()
            {

                Subject=new ClaimsIdentity(Claims),
                Expires=DateTime.Now.AddDays(5),
                SigningCredentials=creds

            };

            var tokenhandler=new JwtSecurityTokenHandler();

            var token=tokenhandler.CreateToken(tokendescriptor);

            return tokenhandler.WriteToken(token);
        }
    }
}