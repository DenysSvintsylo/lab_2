from channels.generic.websocket import WebsocketConsumer
import json

class ChatConsumer(WebsocketConsumer):
    def connect(self):
        self.accept()

    def disconnect(self, close_code):
        pass

    def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json['message']

        # Змінюємо відповідь залежно від отриманого повідомлення
        if message == '1':
            response_message = "Згодом ваші дані пройдуть модерацію, дякую за відгук!"
        elif message == '2':
            response_message = "Згодом дані про ТЦ пройдуть модерацію, дякую за відгук!"
        elif message == '3':
            response_message = "Просимо ваш трішки зачекати й повторити спробу через пару хвилин, дякую за розуміння!"
        else:
            response_message = "Отримано невідоме повідомлення"

        # Відправляємо відповідь назад клієнту
        self.send(text_data=json.dumps({
            'message': response_message
        }))
