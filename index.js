// ==========================================
// Bản quyền thuộc về vingotsoda
// ==========================================

const { Client, RichPresence } = require('discord.js-selfbot-v13');
const readline = require('readline');

const APPLICATION_ID = '1546123981894193172'; 
const IMAGE_URL = 'https://cdn.discordapp.com/attachments/1482256825117315155/1546133406671446129/image.jpg?ex=6aa0a6b1&is=6a9f5531&hm=fa87cba168e43d9944dde6de42b9988f1153f106484386356f33708304845e0e&'; 

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const watermark = `
██╗   ██╗██║███╗   ██╗ ██████╗  ██████╗ ████████╗███████╗ ██████╗ ██████╗  █████╗ 
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
  console.log('\n--- CHỌN LOẠI TRẠNG THÁI ---');
  console.log('1. Đang chơi (Playing)');
  console.log('2. Đang phát trực tiếp (Streaming)');
  console.log('3. Đang nghe (Listening)');
  console.log('4. Đang xem (Watching)');
  console.log('5. Đang thi đấu (Competing)');
  
  rl.question('[?] Nhập số tương ứng (1-5, mặc định là 4 nếu bỏ trống): ', (typeChoice) => {
    rl.question('[?] Nhập nội dung trạng thái muốn hiển thị: ', (statusText) => {
      rl.close();

      let activityType = 'WATCHING';
      switch (typeChoice.trim()) {
        case '1': activityType = 'PLAYING'; break;
        case '2': activityType = 'STREAMING'; break;
        case '3': activityType = 'LISTENING'; break;
        case '4': activityType = 'WATCHING'; break;
        case '5': activityType = 'COMPETING'; break;
        default: activityType = 'WATCHING';
      }

      const client = new Client({ checkUpdate: false });

      client.on('ready', async () => {
        console.log(`\n[!] Đã đăng nhập thành công tài khoản: ${client.user.tag}`);

        try {
          const customStatus = statusText.trim() ? statusText.trim() : 'cách chơi bạn';

          const presence = new RichPresence(client)
            .setApplicationId(APPLICATION_ID)
            .setType(activityType)
            .setName('..')
            .setDetails(customStatus)
            .setAssetsLargeImage(IMAGE_URL)
            .addButton('PROFILE', 'https://tools.vingotsoda.workers.dev/');

          client.user.setPresence({ activities: [presence] });

          console.log(`[!] Vingotsoda / Đã cập nhật Rich Presence thành công (Kiểu: ${activityType})!`);
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
});