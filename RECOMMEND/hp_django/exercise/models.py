from turtle import ondrag
from django.db import models

class Exercise(models.Model):

    class Meta:
        db_table = 'exercise'

    exercise_id = models.AutoField(primary_key=True)
    exercise_name = models.CharField(max_length=100)
    exercise_content = models.TextField()
    created_date = models.DateTimeField()
    modified_date = models.DateTimeField()
    
    def __str__(self):
        return self.exercise_name

class ExercisePart(models.Model):
    class Meta:
        db_table = 'exercise_part'

    exercise_part_id = models.AutoField(primary_key=True)
    exercise = models.ForeignKey('Exercise', related_name='exercisePart', on_delete=models.CASCADE)
    exercise_part_category = models.ForeignKey('ExercisePartCategory', related_name='exercisePartCategory', on_delete=models.CASCADE)  

    def __str__(self):
        return self.exercise_part_category.exercise_part_category_name


class ExercisePartCategory(models.Model):
    class Meta:
        db_table = 'exercise_part_category'

    exercise_part_category_id = models.AutoField(primary_key=True)
    exercise_part_category_name = models.CharField(max_length=255)

    def __str__(self):
        return self.exercise_part_category_name

