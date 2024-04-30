from flask import Flask, jsonify
from flask_cors import CORS
import psycopg2

app = Flask(__name__)
CORS(app)  # 모든 도메인에서의 접근을 허용

# PostgreSQL 데이터베이스 연결 정보 설정
db_host = "192.168.140.221"
db_user = "postgres"
db_name = "postgres"
db_password = "1592"
db_port = "5432"

def get_data_from_db():
    try:
        connection = psycopg2.connect(
            host=db_host,
            port=db_port,
            database=db_name,
            user=db_user,
            password=db_password
        )

        cursor = connection.cursor()

        cursor.execute('SELECT * FROM kwater_pred ORDER BY "logTime" DESC LIMIT 10;')
        data = cursor.fetchall()  

        cursor.close()
        connection.close()

        return data

    except psycopg2.Error as e:
        print("PostgreSQL 연결 오류:", e)
        return []

@app.route('/get_data', methods=['GET'])
def get_latest_data():
    data = get_data_from_db()
    reversed_data = list(reversed(data))
    db_data = [
        [
            float("{:.2f}".format(value)) if isinstance(value, (float, int)) else value
            for value in row
        ]
        for row in reversed_data
    ]

    if not data:
        db_data = [
            ['2024/04/29 14:12', 9.12, 8.11, 13.53, 435.7, 74.04, 22.59, 0, 2405.62, 10.5, 8.94],
            ['2024/04/29 14:10', 3.53, 7.61, 13.79, 363.76, 54.32, 22.85, 0, 3860.62, 5.58, 4.29],
            ['2024/04/29 14:08', 115.68, 7.66, 5.46, 293.34, 99.35, 49.99, 1, 3837.45, 119.52, 126.71],
            ['2024/04/29 14:06', 14.35, 7.54, 9.8, 269.9, 44.29, 28.83, 3, 2488.75, 15.22, 13.39],
            ['2024/04/29 14:04', 27.36, 7.13, 11, 355.51, 66.98, 49.3, 1, 3603.42, 27.81, 25.78],
            ['2024/04/29 14:02', 10.44, 8.66, 19.87, 235.84, 73.9, 23.73, 0, 2244.38, 11.61, 9.97],
            ['2024/04/29 14:02', 6.95, 8.13, 3.3, 548.29, 66.79, 20.4, 0, 3488.75, 8.49, 6.98],
            ['2024/04/22 14:10', 7.29, 8.24, 27.66, 373.9, 62.26, 23.48, 0, 1157.5, 8.86, 7.35],
            ['2024/04/21 22:44', 6.35, 8.3, 5.14, 291.07, 2.56, 24.24, 0, 3871.98, 5.30, 5.29]]
        return jsonify(db_data)  # 데이터가 없으면 빈 배열 반환
    
    return jsonify(db_data)

if __name__ == '__main__':
    app.run(debug=True) 