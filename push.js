var webPush = require('web-push');

const vapidKeys = {
    "publicKey": "BOK9dzXVGxjFPqH-gAQHUuBeGmncRg4DHRn-YZmaNQzKv7P0iy0SGTGXkwZKcl5CmH2v74Ycm7Cw0s-pFgCxh40",
    "privateKey": "4LhZ9SBiNTS26hWQXGupK9IP8nP9PQnTFWU3TjxeWKE"
};


webPush.setVapidDetails(
    'mailto:nedijunaidi123@gmail.com',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)

var pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/dXnBrC_g5gg:APA91bG5rMlB8jztbzcHPAcFh9NiUue9xuz0tqWCAegSp6P6gWsn4S2lLNzntig3l6Gp364aVg43wxvxT-0RUh2-wRma3SsJCz-kbKroTbQrnYHcKdsR6xLgi0Vm0vntyLEAzDlEGc55",
    "keys": {
        "p256dh": "BLbPJtGpAIucCZnql/0qVAoVWFchpzqckS5Vz5d39AVkv1yc9qxHY3+rfBTrV5OM8G/2U8UBcP1Zaxi6G3jYHMo=",
        "auth": "3N62o2+fP/0TphrX7+TYCA=="
    }
};

var payload = 'Selamat datang di Aplikasi Info Bundesliga';

var options = {
    gcmAPIKey: '743530641416',
    TTL: 60
};

webPush.sendNotification(
    pushSubscription,
    payload,
    options
);