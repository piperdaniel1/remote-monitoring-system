import time
import mss
import psutil
import requests

LOG_FILE = "log.txt"
#TARGET = "https://api.danielpiper.dev"
TARGET = "http://localhost:3000"
UPLOAD_PATH = "/upload/record"

def get_battery_pct():
    # get battery percentage
    battery = psutil.sensors_battery()
    return battery.percent

class LogRecord:
    def __init__(self):
        self.screen_pics = []
        self.time = None
        self.battery_pct = None

    def fill(self):
        with mss.mss() as sct:
            for filename in sct.save():
                self.screen_pics.append(filename)

        self.time = time.time()
        self.battery_pct = get_battery_pct()

    def pprint(self):
        print(f"Screen pics: {self.screen_pics}")
        print(f"Time: {self.time}")
        print(f"Battery: {self.battery_pct}")

    def upload(self):
        # upload to server
        URL = TARGET + UPLOAD_PATH

        req_data = {
            "time": self.time,
            "battery_pct": self.battery_pct
        }

        files = []

        for pic in self.screen_pics:
            files.append(("screen_pics", open(pic, "rb")))

        response = requests.post(URL, data=req_data, files=files)

        print(response.status_code)
        print(response.text)

while True:
    record = LogRecord()
    record.fill()
    record.pprint()
    record.upload()
    time.sleep(5)
