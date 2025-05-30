using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using AI_Chatbot.Data.Models;

namespace AI_Chatbot.Data.Configuration
{
    public class SchedulePlanConfiguration : IEntityTypeConfiguration<SchedulePlan>
    {
        public object SchedulePlan { get; internal set; }

        public void Configure(EntityTypeBuilder<SchedulePlan> entity)
        {
            entity.ToTable("SchedulePlan");

            entity.Property(e => e.Id)
                .HasColumnName("Id")
                .ValueGeneratedOnAdd()
                .UseIdentityAlwaysColumn();
            entity.Property(e => e.WakeUpTime)
                .HasMaxLength(255)
                .HasColumnName("wakeUpTime");
            entity.Property(e => e.Work)
                .HasMaxLength(255)
                .HasColumnName("work");
            entity.Property(e => e.WorkTime)
                .HasMaxLength(255)
                .HasColumnName("workTime");
            entity.Property(e => e.Duration)
                .HasMaxLength(255)
                .HasColumnName("duration");

            entity.Property(e => e.Task)
                .HasMaxLength(255)
                .HasColumnName("task");


            entity.Property(e => e.DateTime)
                .HasColumnName("dateTime");


            entity.Property(e => e.UserMessage)
                .HasMaxLength(300)
                .HasColumnName("message");
        }
    }
}