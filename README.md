# Tiêu đề bài tập :
Làm một web call theo webrtc. <br>
Người thực hiện : Phạm Trung Tá.
# Liên kết :
Tham khảo cách sử dụng nodejs, js, socket.io, webrtc cùng với heroku <br>
Link bài làm online : https://github.com/kingcats10012001/call-webrtc
# Hướng dẫn sử dụng :
Chạy npm start. <br>
Rồi truy cập http://localhost:5000/***** <br>
Dấu *** kia bao gồm 10 ký tự trở xuống, <br>
Muốn cùng kết nối với nhau thì phần * kia phải giống nhau là ok.
# Kiến thức nắm được :
Cách sử dụng nodejs, js, socket.io, webrtc. <br>
Hiểu được webrtc là gì và cách dùng ra sao. <br>
# Todo :
Sử dụng các url công cộng để làm.<br>
# Credit:
webrtc: https://webrtc.org <br>
socket.io: https://socket.io/ <br>
Các url công cộng để chạy:  <br>
{urls: 'stun:stun.l.google.com'}, <br>
{ urls: 'stun:stun.stunprotocol.org' }, <br>
{ urls: 'stun:stun.sipnet.net' }, <br>
{ urls: 'stun:stun.ideasip.com' }, <br>
{ urls: 'stun:stun.iptel.org' }, <br>
{ urls: 'turn:numb.viagenie.ca', username: 'đăng ký rồi nhập', credential: 'đăng ký rồi nhập' }, <br>
mọi người nhớ vào app/script.js tại dòng 33 để đổi tk mk nha. <br>

{ <br>
urls: [ <br>
'turn:173.194.72.127:19305?transport=udp', <br>
'turn:[2404:6800:4008:C01::7F]:19305?transport=udp', <br>
'turn:173.194.72.127:443?transport=tcp', <br>
'turn:[2404:6800:4008:C01::7F]:443?transport=tcp' <br>
], <br>
username: 'CKjCuLwFEgahxNRjuTAYzc/s6OMT', <br>
credential: 'u1SQDR/SQsPQIxXNWQT7czc/G4c=' <br>
} <br>    
