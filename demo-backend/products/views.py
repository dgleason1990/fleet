import json
from sqlite3 import DataError
from django.http import JsonResponse
from django.shortcuts import HttpResponse

from rest_framework.decorators import api_view
from django.db import connection, utils

# Create your views here.
@api_view(['GET', 'DELETE', 'POST'])
def products(request):
    if request.method == 'POST':
        columns = None
        values = None

        for i, item in enumerate(list(request.data.items())):
            if i == 0:
                columns = item[0] 
                values = f"'{item[1]}'"
            elif item[1] == 'discount_amount' or item[1] == 'pricing_amount':
                values = values + ',' + f"{item[1]}"
                columns = columns + ',' +  item[0]
            else:
                columns = columns + ',' +  item[0]
                values = values + ',' + f"'{item[1]}'"
        with connection.cursor() as cursor:
            try:
                cursor.execute(f"INSERT INTO products_products({columns}) VALUES ({values})")
                cursor.close()
            except utils.DataError as e:
                return HttpResponse(content=json.dumps({'message':'Wrong data type please try again'}), status=403)


    if request.method == 'DELETE':        
        for id in request.GET.get('id').split('&'):
            with connection.cursor() as cursor:
                    cursor.execute(f"DELETE FROM products_products WHERE id = {id}")
                    cursor.close()
                
    with connection.cursor() as cursor:

        cursor.execute('SELECT ARRAY_AGG(id) AS id, name, ARRAY_AGG(mode_type) AS mode_type, ARRAY_AGG(pricing_type) AS pricing_type,\
             ARRAY_AGG(pricing_unit) AS pricing_unit, pricing_amount, icon_url, metro_area, transaction_name, \
                discount_amount, discount_description FROM products_products GROUP BY name, pricing_amount, icon_url,\
                     metro_area, transaction_name, discount_amount, discount_description')

        columns = cursor.description
        result = [{columns[index][0]:column for index, column in enumerate(value)} for value in cursor.fetchall()]
        cursor.close()
        
    with connection.cursor() as cursor:
        cursor.execute("SELECT column_name FROM information_schema.columns WHERE table_name = 'products_products'")
        available_columns = []
        for columns in cursor.fetchall():
            available_columns.append(columns[0])

    return JsonResponse({'products':result, 'available_columns': available_columns})