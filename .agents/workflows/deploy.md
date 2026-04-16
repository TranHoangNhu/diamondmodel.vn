---
description: Deploy visagovietnam.com lên VPS INET. Dùng khi cần deploy thủ công hoặc kiểm tra trạng thái deploy.
---

# Deploy VisaGoVietnam

// turbo-all

## Quick Deploy (thủ công — không chờ cron 2 phút)

1. Load env variables:
```bash
export $(grep -v '^#' .env | xargs)
```

2. Trigger deploy script trên VPS:
```bash
ssh -i "$INET_VPS_PEM_PATH" -o StrictHostKeyChecking=no -p $INET_VPS_PORT $INET_VPS_USER@$INET_VPS_IP "bash /var/www/visagovietnam/deploy.sh"
```

3. Verify deploy thành công:
```bash
ssh -i "$INET_VPS_PEM_PATH" -o StrictHostKeyChecking=no -p $INET_VPS_PORT $INET_VPS_USER@$INET_VPS_IP "cd /var/www/visagovietnam && git log --oneline -1 && pm2 jlist | python3 -c \"import sys,json;[print(a['name'],a['pm2_env']['status']) for a in json.load(sys.stdin)]\""
```

4. Verify domain live:
```bash
curl -sI --connect-timeout 10 https://visagovietnam.com | head -5
```

## Xem Deploy Log

```bash
ssh -i "$INET_VPS_PEM_PATH" -o StrictHostKeyChecking=no -p $INET_VPS_PORT $INET_VPS_USER@$INET_VPS_IP "tail -30 /var/log/visagovietnam-deploy.log"
```

## Auto-Deploy (đã thiết lập)

Cron `*/2 * * * *` trên VPS tự động:
1. `git fetch origin main`
2. So sánh local HEAD vs remote HEAD
3. Nếu khác → `git reset --hard origin/main` → `npm run build` → `pm2 restart`

**Không cần can thiệp** — chỉ cần push code lên GitHub, VPS tự deploy trong 2 phút.
