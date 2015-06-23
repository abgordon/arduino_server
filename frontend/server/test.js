//curl -v http://52.26.172.154:49152/postdata -d {"temp_f":"28.40"}
												  temp_f=28.60&relative_humidity=44.00

POST /postdata/ HTTP/1.1
User-Agent: Arduino/0.6.0
Host: http://52.26.172.154:49152
Accept: */*
Content-Length: 36
Content-Type: application/x-www-form-urlencoded

temp_f=28.40&relative_humidity=45.30

POST /postdata HTTP/1.1
User-Agent: curl/7.37.1
Host: 52.26.172.154:49152
Accept: */*
Content-Length: 36
Content-Type: application/x-www-form-urlencoded



POST /postdata/ HTTP/1.1
Host: http://52.26.172.154:49152
User-Agent: Arduino/0.6.0
Accept: application/json
Content-Type: application/json
Content-Length: 36

{"fields": [{"temperature_c": "28.80", "relative_humidity": "44.40"}]}
