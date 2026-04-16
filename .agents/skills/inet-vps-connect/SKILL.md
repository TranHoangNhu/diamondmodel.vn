---
name: inet-vps-connect
description: "Kiểm tra và kết nối nhanh các VPS Linux của INET (Ubuntu, Debian...) sử dụng file .env để lấy IP/User/Port và tải file .pem về để làm khoá. Cũng dùng khi cần deploy code lên VPS, kiểm tra trạng thái deploy, hoặc xem log deploy."
metadata:
  version: "2.0"
---

# INET VPS Connect

## Mục tiêu
- Cung cấp một bộ quy trình chuẩn để truy cập và kiểm tra (health, connectivity) cho mọi VPS Linux (Ubuntu) từ nhà cung cấp INET.
- Cho phép người dùng lưu tham số (IP, User, Port) vào `.env` để tái sử dụng, đồng thời nhận đường dẫn file `.pem` tuỳ ý do người dùng tải từ web (không commit file `.pem` vào source).
- Cho phép agent tự đọc `.env` và SSH bằng tool lệnh của hệ thống.
- Hỗ trợ auto-deploy khi source code thay đổi trên GitHub/Betech mirror.

## Thiết lập Môi trường (.env)
Đảm bảo project có file `.env` chứa các cấu hình kết nối. 

**Ví dụ:**
```env
INET_VPS_IP=103.56.163.190
INET_VPS_USER=root
INET_VPS_PORT=22
INET_VPS_PEM_PATH=.keys/CS-Turbo-20260224134632249.pem
```

## Hướng dẫn kết nối cơ bản & Chẩn đoán sơ bộ

### 1. External Check (Kiểm tra từ bên ngoài)
Trường hợp host "chết hẳn" hoặc bị DDoS, hãy thử các lệnh sau từ local:

```bash
# Lấy biến từ env
export $(grep -v '^#' .env | xargs)

# 1. Ping
ping -c 4 $INET_VPS_IP || ping -n 4 $INET_VPS_IP
# 2. Curl HTTP / SSH check ping (Timeout 5s)
curl -sI --connect-timeout 5 http://$INET_VPS_IP:$INET_VPS_PORT
```

Nếu thất bại toàn bộ -> **VPS unreachable**. Gọi User dùng _VNC Console trên INET Panel_ để restart, vì không agent nào có thể truy cập hệ thống đang sập mạng (trừ khi dùng được Web Automation trên panel nhà cung cấp).

### 2. Login Server (SSH)
Nếu IP có mạng, hãy kết nối sử dụng file `.pem`:

```bash
ssh -i "$INET_VPS_PEM_PATH" -o StrictHostKeyChecking=no -p $INET_VPS_PORT $INET_VPS_USER@$INET_VPS_IP
```

### 3. VPS Checkup (Health & Disks)
Ngay sau khi login bằng SSH được từ Local, tiến hành các command kiểm tra thông thường (skill `vps-checkup`):

```bash
df -h
top -b -n 1 | head -n 20
journalctl -p 3 -xb --no-pager
docker ps -a
```

## Auto-Deploy System

### Kiến trúc
```
git push (local) → GitHub (TranHoangNhu) → Mirror → Betech-JSC
                                                       ↓
VPS Cron (mỗi 2 phút) → git fetch → có thay đổi? → pull → build → pm2 restart
```

### Files trên VPS

| File | Đường dẫn | Chức năng |
|------|-----------|-----------|
| Deploy script | `/var/www/visagovietnam/deploy.sh` | Pull, build, restart PM2 |
| Deploy log | `/var/log/visagovietnam-deploy.log` | Log mọi deploy kèm timestamp |
| Lock file | `/tmp/visagovietnam-deploy.lock` | Tránh deploy song song |
| SSH key | `/root/.ssh/betech-deploy-key` | Deploy key cho Betech-JSC repo |
| SSH config | `/root/.ssh/config` | Map GitHub host → deploy key |
| Cron | `*/2 * * * *` | Chạy deploy.sh mỗi 2 phút |

### Lệnh hữu ích

```bash
# Xem log deploy gần nhất
ssh -i "$INET_VPS_PEM_PATH" -o StrictHostKeyChecking=no -p $INET_VPS_PORT $INET_VPS_USER@$INET_VPS_IP "tail -20 /var/log/visagovietnam-deploy.log"

# Deploy thủ công (không chờ cron)
ssh -i "$INET_VPS_PEM_PATH" -o StrictHostKeyChecking=no -p $INET_VPS_PORT $INET_VPS_USER@$INET_VPS_IP "bash /var/www/visagovietnam/deploy.sh"

# Xem PM2 status
ssh -i "$INET_VPS_PEM_PATH" -o StrictHostKeyChecking=no -p $INET_VPS_PORT $INET_VPS_USER@$INET_VPS_IP "pm2 jlist | python3 -c \"import sys,json;[print(a['name'],a['pm2_env']['status']) for a in json.load(sys.stdin)]\""

# Xem commit đang live
ssh -i "$INET_VPS_PEM_PATH" -o StrictHostKeyChecking=no -p $INET_VPS_PORT $INET_VPS_USER@$INET_VPS_IP "cd /var/www/visagovietnam && git log --oneline -1"
```

### Deploy key setup (đã hoàn thành)
- Local key pair: `.keys/betech-deploy-key` + `.keys/betech-deploy-key.pub`
- VPS key: `/root/.ssh/betech-deploy-key` (cần `dos2unix` nếu upload từ Windows)
- Git remote trên VPS: `git@github.com:Betech-JSC/bed-visagovietnam.git` (SSH, không HTTPS)

## Staging Environment

### Kiến trúc
```
Backend dev push → Betech-JSC (staging branch) → VPS Cron (2 phút) → staging.visagovietnam.com
```

### Files trên VPS

| File | Đường dẫn | Chức năng |
|------|-----------|-----------| 
| Source code | `/var/www/visagovietnam-staging` | Clone từ Betech, branch `staging` |
| Deploy script | `/var/www/visagovietnam-staging/deploy.sh` | Pull, build, restart PM2 |
| Deploy log | `/var/log/visagovietnam-staging-deploy.log` | Log deploy kèm timestamp |
| Env file | `/var/www/visagovietnam-staging/.env.local` | Backend dev tự fill |
| PM2 app | `visagovietnam-staging` | Port 3002 |
| Nginx | `/etc/nginx/sites-available/staging.visagovietnam.com` | Proxy → :3002, SSL |
| Cron | `*/2 * * * *` | Auto-deploy mỗi 2 phút |

### Lưu ý quan trọng
- SSH port thực tế là **22** (INET Panel ghi 24700 là port VNC/Remote, KHÔNG phải SSH)
- Staging và Production chạy độc lập trên cùng VPS
- Hướng dẫn cho backend dev: `.docs/STAGING-GUIDE.md`
