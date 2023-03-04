using System.Security.Claims;
using API.Dto;
using API.Services.TokenServices;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AccoutController : ControllerBase
    {
        private readonly UserManager<user> userManager;
        private readonly TokenService tokenService;

        public AccoutController(UserManager<user> userManager, TokenService tokenService)
        {
            this.userManager = userManager;
            this.tokenService = tokenService;
        }
        private UserDTO CreateUserObject(user user)
        {
            return new UserDTO
            {
                UserName = user.UserName,
                token = tokenService.CreateToken(user),
                firstName = user.firstName,
                lastName = user.lastName,
            };
        }
        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<ActionResult<UserDTO>> Login(LoginDTO loginDto){
            var user = await userManager.FindByEmailAsync(loginDto.email);
            if(user == null)
            {
                return Unauthorized();
            }

            var result = await userManager.CheckPasswordAsync(user,loginDto.password); 
            if(result)
            {
                return CreateUserObject(user);
            }
            return Unauthorized();
        }


        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<ActionResult<UserDTO>> Register(RegisterDTO registerDTO){
            if(await userManager.Users.AnyAsync(x => x.UserName == registerDTO.UserName))
            {
                //TO DO - change for safer message
                return BadRequest("UserName is already taken!");  
            }

            var user = new user{
                Email = registerDTO.email,
                firstName = registerDTO.firstName,
                lastName = registerDTO.lastName,
                UserName = registerDTO.UserName
            };

            var result = await userManager.CreateAsync(user,registerDTO.password);
            if (result.Succeeded)
            {
                return new UserDTO
                {
                    firstName = user.firstName,
                    lastName = user.lastName,
                    token = "123",
                    UserName = user.UserName
                };
            }
            else
            {
            return BadRequest(result.Errors);                
            }
        }

        [Authorize]
        [HttpGet("getUser")]
        public async Task<ActionResult<UserDTO>> GetCurrentUser()
        {
            var user = await userManager.FindByEmailAsync(User.FindFirstValue(ClaimTypes.Email));
            return CreateUserObject(user);
        }
    }
}