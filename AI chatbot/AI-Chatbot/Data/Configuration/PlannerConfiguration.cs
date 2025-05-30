using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using AI_Chatbot.Data.Models;

namespace AI_Chatbot.Data.Configuration
{
    public class PlannerConfiguration : IEntityTypeConfiguration<Planner>
{
    public object Planner { get; internal set; }

    public void Configure(EntityTypeBuilder<Planner> entity)
    {
        entity.ToTable("Planner");

        entity.Property(e => e.Id)
            .HasColumnName("Id")
            .ValueGeneratedOnAdd()
            .UseIdentityAlwaysColumn();

        entity.Property(e => e.WakeTime)
            .HasMaxLength(255)
            .HasColumnName("WakeTime");

        entity.Property(e => e.WorkHours)
            .HasColumnName("WorkHours");


        entity.Property(e => e.Activities)
            .HasMaxLength(300)
            .HasColumnName("Activities");

        entity.Property(e => e.FreeTime)
            .HasMaxLength(300)
            .HasColumnName("FreeTime");
    }
}
}