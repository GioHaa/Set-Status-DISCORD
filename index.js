// ==========================================
// Bản quyền thuộc về vingotsoda
// ==========================================

const { Client } = require('discord.js-selfbot-v13');
const readline = require('readline');

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
  ╚═══╝  ╚═╝╚═╝  ╚═══╝ ╚═════╝  ╚═════╝    ╚═╝   ╚══════╝ ╚═════╝ ╚═════╝ ╚═╝  ╚═╝
==================================================================================
                        TOOL TRẠNG THÁI BY VINGOTSODA
==================================================================================
`;

console.clear();
console.log(watermark);

rl.question('[?] Vui lòng nhập Token Discord của bạn: ', (token) => {
  rl.question('[?] Nhập nội dung trạng thái muốn hiển thị: ', (statusText) => {
    console.log('\nChọn kiểu hoạt động:');
    console.log('1. Đang chơi (PLAYING)');
    console.log('2. Đang nghe (LISTENING)');
    console.log('3. Đang xem (WATCHING)');
    console.log('4. Đang phát trực tiếp (STREAMING)');
    
    rl.question('[?] Nhập số tương ứng (1-4, mặc định là 1): ', (typeChoice) => {
      rl.close();

      let activityType = 'PLAYING';
      if (typeChoice.trim() === '2') activityType = 'LISTENING';
      else if (typeChoice.trim() === '3') activityType = 'WATCHING';
      else if (typeChoice.trim() === '4') activityType = 'STREAMING';

      const client = new Client({ checkUpdate: false });

      client.on('ready', async () => {
        console.log(`\n[!] Đã đăng nhập thành công tài khoản: ${client.user.tag}`);

        const customStatus = statusText.trim() ? statusText.trim() : 'Visual Studio Code vingotsoda';

      
        const options = { type: activityType };
        if (activityType === 'STREAMING') {
          options.url = 'https://twitch.tv/discord'; // Link bắt buộc nếu chọn streaming
        }

        client.user.setActivity(customStatus, options);

        console.log(`[!] Vingotsoda / Đã cập nhật trạng thái [${activityType}] "${customStatus}" thành công!`);
        console.log('[!] Vui lòng treo nguyên cửa sổ đen này để duy trì trạng thái.');
      });

      client.login(token.trim()).catch(() => {
        console.log('\n[-] Token không hợp lệ hoặc đã bị đổi. Vui lòng tắt tool và thử lại.');
      });
    });
  });
});