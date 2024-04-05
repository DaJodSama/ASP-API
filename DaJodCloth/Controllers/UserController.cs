using DaJodCloth.Data;
using DaJodCloth.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DaJodCloth.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly DataBaseContext _context;

        public UserController(DataBaseContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<UserDto>>> GetAllUsers()
        {
            var Users = await _context.Users.ToListAsync();
            var UserDtos = Users.Select(p => new UserDto
            {
                Id = p.Id,
                FirstName = p.FirstName,
                LastName = p.LastName,
                Email = p.Email,
                Password = p.Password
            }).ToList();

            var totalResults = UserDtos.Count;
            Response.Headers.Append("Content-Range", $"{totalResults}");

            return Ok(UserDtos);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<List<UserDto>>> GetUser(int id)
        {
            var User = await _context.Users.FindAsync(id);
            if (User is null)
            {
                return NotFound("User not found.");
            }

            var UserDto = new UserDto
            {
                Id = User.Id,
                FirstName = User.FirstName,
                LastName = User.LastName,
                Email = User.Email,
                Password = User.Password
            };
            return Ok(User);
        }

        [HttpPost]
        public async Task<ActionResult<List<UserDto>>> AddUser(UserDto prdDto)
        {
            var User = new User
            {
                FirstName = prdDto.FirstName,
                LastName = prdDto.LastName,
                Email = prdDto.Email,
                Password = prdDto.Password
            };

            _context.Users.Add(User);
            await _context.SaveChangesAsync();

            prdDto.Id = User.Id;

            var totalResults = await _context.Users.CountAsync(); // Số lượng người dùng trong cơ sở dữ liệu
            Response.Headers.Append("Content-Range", $"{totalResults}");

            return CreatedAtAction(nameof(GetUser), new { id = User.Id }, prdDto);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<List<UserDto>>> UpdateUser(UserDto updateUser)
        {
            var dbUser = await _context.Users.FindAsync(updateUser.Id);
            if (dbUser is null)
            {
                return NotFound("User not found.");
            }
            dbUser.FirstName = updateUser.FirstName;
            dbUser.LastName = updateUser.LastName;
            dbUser.Email = updateUser.Email;
            dbUser.Password = updateUser.Password;

            await _context.SaveChangesAsync();

            var totalResults = await _context.Users.CountAsync(); // Số lượng người dùng trong cơ sở dữ liệu
            Response.Headers.Append("Content-Range", $"{totalResults}");

            return Ok(await _context.Users.ToListAsync());
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<List<User>>> DeleteUser(int id)
        {
            var dbUser = await _context.Users.FindAsync(id);
            if (dbUser is null)
            {
                return NotFound("User not found.");
            }
            _context.Users.Remove(dbUser);
            await _context.SaveChangesAsync();

            return Ok(await _context.Users.ToListAsync());
        }
    }
}
