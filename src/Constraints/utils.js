
export const pushNotification = async ({ token, title, body }) => {

  let url = 'https://exp.host/--/api/v2/push/send';

  let options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ "to": token, "title": title, "body": body })
  };
  fetch(url, options)
    .then(res => res.json())
    .then(json => console.log(json))
    .catch(err => console.error('error:' + err));
}