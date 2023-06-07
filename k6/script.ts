import http from 'k6/http';
import { check, sleep } from 'k6';
import { randomSeed } from 'k6';

export let options1 = {
  stages: [
    { duration: '5s', target: 1 },
    { duration: '8s', target: 2 },
    { duration: '12s', target: 5 },
    { duration: '2s', target: 1 },
  ],
  thresholds: {
    http_req_duration: ['p(90) < 200', 'p(95) < 500', 'p(99.9) < 1200'],
  }
};

export const options = {
  // Key configurations for Stress in this section
  stages: [
    { duration: '10m', target: 200 }, // traffic ramp-up from 1 to a higher 200 users over 10 minutes.
    { duration: '30m', target: 200 }, // stay at higher 200 users for 10 minutes
    { duration: '5m', target: 0 }, // ramp-down to 0 users
  ],
};
export default function () {
  // randomSeed(123456789);
  // let rnd = Math.random();
  let data = {
    "id": "",
    "name": "Diego",
    "email": "diego.grassato@gmail.com",
    "password": "grassatogmail"
  };
  
  let headers = { 'Content-Type': 'application/json' };
  let res = http.post('http://10.22.0.20:3000', JSON.stringify(data), { headers: headers });
   
  check(res, { 'status was 201': (r) => r.status == 201 });

  let detail = http.get('http://10.22.0.20:3000');
  check(detail, { 'status was 200': (r) => r.status == 200 });
  // var random_boolean = (rnd % 2 == 1);
  // let deleteData = http.del('http://10.22.0.20:3000' + id);
  // check(deleteData, { 'status was 204': (r) => r.status == 204 });
  sleep(1);
}