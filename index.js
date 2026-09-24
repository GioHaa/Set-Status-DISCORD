// ==========================================
// Bản quyền thuộc về vingotsoda
// ==========================================

const { Client, RichPresence } = require('discord.js-selfbot-v13');
const readline = require('readline');

const APPLICATION_ID = '1546123981894193172'; 

const ANH_LON_URL = 'dán_ảnh_vào_đây'; 

const GIF_NHO_URL = 'dán_ảnh_vào_đây'; 

const ANH_KHOI_DUOI_URL = 'dán_ảnh_vào_đây'; 

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

const LOAI_TRANG_THAI = {
  '1': { type: 'PLAYING',    label: 'Đang chơi' },
  '2': { type: 'STREAMING',  label: 'Đang phát trực tiếp' },
  '3': { type: 'LISTENING',  label: 'Đang nghe' },
  '4': { type: 'WATCHING',   label: 'Đang xem' },
  '5': { type: 'COMPETING',  label: 'Đang thi đấu' },
};

console.log('[?] Chọn loại trạng thái:');
console.log('    1. Đang chơi (PLAYING)');
console.log('    2. Đang phát trực tiếp (STREAMING)');
console.log('    3. Đang nghe (LISTENING)');
console.log('    4. Đang xem (WATCHING)');
console.log('    5. Đang thi đấu (COMPETING)');

rl.question('[?] Nhập số (1-5): ', (chon) => {
  const chonInfo = LOAI_TRANG_THAI[chon.trim()] || LOAI_TRANG_THAI['1'];

  const hoiToken = () => {
    rl.question('[?] Vui lòng nhập Token Discord của bạn: ', (token) => {
      if (chonInfo.type === 'STREAMING') {
        rl.question('[?] Nhập link Twitch hoặc YouTube (bắt buộc): ', (streamUrl) => {
          rl.close();
          batDauBot(token, chonInfo.type, streamUrl.trim());
        });
      } else {
        rl.close();
        batDauBot(token, chonInfo.type, null);
      }
    });
  };
  hoiToken();
});

async function batDauBot(token, loaiTrangThai, streamUrl) {
  const client = new Client({ checkUpdate: false });

  client.on('ready', async () => {
    console.log(`\n[!] Đã đăng nhập thành công tài khoản: ${client.user.tag}`);

    try {
      // Thanh tiến trình kiểu "36/67"
      const PARTY_CURRENT = 36; 
      const PARTY_MAX = 67;    

      console.log('[!] Đang xử lý link ảnh...');

      const externalAnhLon = await RichPresence.getExternal(client, APPLICATION_ID, ANH_LON_URL);
      const pathAnhLon = externalAnhLon[0].external_asset_path;

      const externalGifNho = await RichPresence.getExternal(client, APPLICATION_ID, GIF_NHO_URL);
      const pathGifNho = externalGifNho[0].external_asset_path;

      const externalKhoiDuoi = await RichPresence.getExternal(client, APPLICATION_ID, ANH_KHOI_DUOI_URL);
      const pathKhoiDuoi = externalKhoiDuoi[0].external_asset_path;

      const presence = new RichPresence(client)
        .setApplicationId(APPLICATION_ID)
        .setName('VINGOTSODA') 
        .setType(loaiTrangThai)
        .setDetails('Bo vai cua em, la noi') 
        .setState('Ma anh thay yen binh nhat') 
        .setAssetsLargeImage(pathAnhLon) 
        .setAssetsLargeText('dsc.gg/exxgh')
        .setAssetsSmallImage(pathGifNho) 
        .setAssetsSmallText('dsc.gg/exxgh')
        .setParty({ max: PARTY_MAX, current: PARTY_CURRENT })
        .addButton('DUONG VAO TIM ANH (AN VAO)', 'https://tools.vingotsoda.workers.dev/');

      if (loaiTrangThai === 'STREAMING' && streamUrl) {
        presence.setURL(streamUrl);
      }

      const nowMs = Date.now();
      const secondBlock = new RichPresence(client)
        .setApplicationId(APPLICATION_ID)
        .setName('Gia Hao') 
        .setType('LISTENING')
        .setDetails('℅°.·°.·°') 
        .setState('Gia Hao')
        .setAssetsSmallImage(pathKhoiDuoi) 
        .setStartTimestamp(nowMs - PARTY_CURRENT * 60 * 1000)
        .setEndTimestamp(nowMs + (PARTY_MAX - PARTY_CURRENT) * 60 * 1000);

      client.user.setPresence({ activities: [presence, secondBlock] });

      console.log(`[!] Vingotsoda / Đã cập nhật Rich Presence thành công! (${loaiTrangThai})`);
      console.log('[!] Vui lòng treo nguyên cửa sổ đen này để duy trì trạng thái.');
    } catch (err) {
      console.log(`[-] Lỗi Rich Presence: ${err.message}`);
      console.log('[!] Hãy kiểm tra lại link ảnh. Link phải là link trực tiếp (kết thúc bằng .png, .jpg, .gif) và xem được công khai.');
    }
  });

  client.login(token.trim()).catch(() => {
    console.log('\n[-] Token không hợp lệ hoặc đã bị đổi. Vui lòng kiểm tra lại.');
  });
}