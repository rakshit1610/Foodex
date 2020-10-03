# Generated by Django 3.1.1 on 2020-10-02 22:15

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0005_likesystem'),
    ]

    operations = [
        migrations.AddField(
            model_name='myuser',
            name='bookmark_count',
            field=models.PositiveIntegerField(default=0),
        ),
        migrations.CreateModel(
            name='BookmarkRecord',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('active', models.IntegerField()),
                ('bookmark_to', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='blog.recipe')),
                ('bookmarked_by', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='bookmarked', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
