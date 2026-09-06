// ==========================================
// Bản quyền thuộc về vingotsoda
// ==========================================

const { Client } = require('discord.js-selfbot-v13');
const readline = require('readline');

const APPLICATION_ID = '1546123981894193172'; 
// BẠN HÃY DÁN LINK ẢNH TRỰC TIẾP VÀO ĐÂY (Vd: link ảnh copy từ discord, imgur...)
const IMAGE_URL = 'dán link ảnh vào đây'; 

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const watermark = `
██╗   ██╗██╗███╗   ██╗ ██████╗  ██████╗ ████████╗███████╗ ██████╗ ██████╗  █████╗ 
██║   ██║██║████╗  ██║██╔════╝ ██╔═══██╗╚══██╔══╝██╔════╝██╔═══██╗██╔══██╗██╔══██╗
██║   ██║██║██╔██╗ ██║██║  ███╗██║   ██║   ██║   ███████╗██║   ██║██║  ██║███████║
╚██╗ ██╔╝██║██║╚██╗██║██║   ██║██║   ██║   ██║   ╚════██║██║   ██║██║  ██║██╔══██║
 ╚████╔╝ ██║██║ ╚████║╚██████╔╝╚██████╔╝   ██║   ███████║╚██████╔╝██████╔╝██║  ██║
  ╚═══╝  ╚═╝╚═╝  ╚════╝  ╚════╝    ╚═╝   ╚══════╝  ╚═════╝  ╚═════╝  ╚═╝  ╚═╝
==================================================================================
                     TOOL RICH PRESENCE BY VINGOTSODA
==================================================================================
`;

console.clear();
console.log(watermark);

rl.question('[?] Vui lòng nhập Token Discord của bạn: ', (token) => {
  rl.question('[?] Nhập nội dung trạng thái muốn hiển thị: ', (statusText) => {
    rl.close();

    const client = new Client({ checkUpdate: false });

    client.on('ready', async () => {
      console.log(`\n[!] Đã đăng nhập thành công tài khoản: ${client.user.tag}`);

      try {
        const customStatus = statusText.trim() ? statusText.trim() : 'cách chơi bạn';

        client.user.setPresence({
          activities: [{
            name: 'Vingotsoda',
            type: 'WATCHING',
            application_id: APPLICATION_ID,
            details: customStatus,
            assets: {
              large_image: IMAGE_URL
            }
          }]
        });

        console.log(`[!] Vingotsoda / Đã cập nhật Rich Presence thành công!`);
        console.log('[!] Vui lòng treo nguyên cửa sổ đen này để duy trì trạng thái.');
      } catch (err) {
        console.log(`[-] Lỗi Rich Presence: ${err.message}`);
      }
    });

    client.login(token.trim()).catch(() => {
      console.log('\n[-] Token không hợp lệ hoặc đã bị đổi. Vui lòng kiểm tra lại.');
    });
  });
});