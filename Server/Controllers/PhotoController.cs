// using Microsoft.AspNetCore.Mvc;
// using MongoDB.Driver;
// using MongoDB.Bson;
// using System;
// public class PhotoController : Controller
// {
//     private readonly IWebHostEnvironment _environment;
//     private readonly CursovaContext _context;

//     public PhotoController(IWebHostEnvironment environment, ApplicationDbContext context)
//     {
//         _environment = environment;
//         _context = context;
//     }

//     [HttpGet("galleryImages")]
//     public IActionResult Upload()
//     {
//         return View();
//     }

//     [HttpPost]
//     public IActionResult Upload(IFormFile file)
//     {
//         if (file != null && file.Length > 0)
//         {
//             var uploadsFolder = Path.Combine(_environment.WebRootPath, "images/photos");

//             // Уникайте конфліктів імен файлів, генеруючи унікальне ім'я
//             var uniqueFileName = Guid.NewGuid().ToString() + "_" + file.FileName;
//             var filePath = Path.Combine(uploadsFolder, uniqueFileName);

//             using (var fileStream = new FileStream(filePath, FileMode.Create))
//             {
//                 file.CopyTo(fileStream);
//             }

//             // Зберігаємо у базі даних ім'я файлу або інші відомості
//             var photo = new Photo { FileName = uniqueFileName };
//             _context.Photos.Add(photo);
//             _context.SaveChanges();
//         }

//         return RedirectToAction("Index", "Home");
//     }
// }