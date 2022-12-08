# Generated by Django 3.2.16 on 2022-12-06 18:49

from django.db import migrations, models
from django.db import connection
import os
import csv

def load_data(apps,*args):
    with connection.cursor() as cursor:
        sql="COPY products_products FROM STDIN DELIMITER ',' CSV HEADER"
        cursor.copy_expert(sql, open(f'{os.getcwd()}/sample_data/products.csv', "r"))
        sql="COPY transactions_transactions FROM STDIN DELIMITER ',' CSV HEADER"
        cursor.copy_expert(sql, open(f'{os.getcwd()}/sample_data/transactions.csv', "r"))

class Migration(migrations.Migration):

    dependencies = [('transactions','0001_initial'),('products','0001_initial')]

    operations = [migrations.RunPython(load_data)]
