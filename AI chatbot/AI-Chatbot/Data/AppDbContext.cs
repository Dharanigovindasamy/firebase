using Microsoft.EntityFrameworkCore;
using AI_Chatbot.Data.Configuration;
using AI_Chatbot.Data.Models;
using AI_Chatbot.Data;

namespace AI_Chatbot.Data
{
    public partial class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

        public virtual DbSet<SchedulePlan> SchedulePlan { get; set; }
        public virtual DbSet<Planner> Planner { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:Collation", "English_United States.1252");

            modelBuilder.ApplyConfiguration(new SchedulePlanConfiguration());
            modelBuilder.ApplyConfiguration(new PlannerConfiguration());

        OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}