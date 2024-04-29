from flask import Flask, jsonify
from flask_cors import CORS
import psycopg2

app = Flask(__name__)
CORS(app)  # 모든 도메인에서의 접근을 허용

# PostgreSQL 데이터베이스 연결 정보 설정
db_host = "192.168.225.33"
db_user = "postgres"
db_name = "postgres"
db_password = "12345678"
db_port = "5432"

def get_data_from_db1():
    try:
        connection = psycopg2.connect(
            host=db_host,
            port=db_port,
            database=db_name,
            user=db_user,
            password=db_password
        )

        cursor = connection.cursor()

        cursor.execute('SELECT * FROM public.kwater ORDER BY "logTime" DESC LIMIT 15;')
        data = cursor.fetchall()  # 가장 최근 레코드 15개 가져오기

        cursor.close()
        connection.close()

        return data

    except psycopg2.Error as e:
        print("PostgreSQL 연결 오류:", e)
        return []

@app.route('/get_latest_data', methods=['GET'])
def get_latest_data():
    data = get_data_from_db1()
    db_data = [
        [
            float("{:.2f}".format(value)) if isinstance(value, (float, int)) else value
            for value in row
        ]
        for row in data
    ]

    return jsonify(db_data)

if __name__ == '__main__':
    app.run(debug=True)