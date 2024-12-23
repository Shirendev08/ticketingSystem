# Generated by Django 5.1.4 on 2024-12-23 16:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='ticket',
            name='status',
            field=models.CharField(choices=[('Open', 'Open'), ('Closed', 'Closed'), ('In Progress', 'In Progress')], default='Open', max_length=15),
        ),
    ]