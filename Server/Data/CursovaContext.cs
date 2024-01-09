// using MyMvcApp.Models;
// using Microsoft.EntityFrameworkCore;

// namespace MyMvcApp.Data
// {
//     public class CursovaContext:DbContext
//     {
//         public ApplicationDBContext(DbContextOptions<CursovaContext> options) : base(options)
//         {

//         }
//         public DbSet<Category> MyProperty { get; set; }

//         protected override void OnModelCreating(ModelBuilder modelBuilder)
//         {
//             //base.OnModelCreating(modelBuilder);
//             modelBuilder.Entity<Category>().HasData(
//                 new Category { Id = 1, Name = "Action", DisplayOrder = 1},
//                 new Category { Id = 2, Name = "Action", DisplayOrder = 2 },
//                 new Category { Id = 3, Name = "Action", DisplayOrder = 3 }

//                 );
//         }
//     }
// }
