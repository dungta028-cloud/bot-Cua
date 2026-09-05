import { SlashCommandBuilder, EmbedBuilder } from "discord.js";

const questionBank = [
  // --- KHOA HỌC & TỰ NHIÊN (1-25) ---
  { category: "Khoa học", question: "Hành tinh nào trong Hệ Mặt Trời có nhiệt độ bề mặt nóng nhất?", options: ["Sao Hỏa", "Sao Kim", "Sao Mộc", "Sao Thổ"], answer: "Sao Kim", explanation: "Sao Kim có hiệu ứng nhà kính cực mạnh." },
  { category: "Khoa học", question: "Loại khí nào chiếm tỷ lệ lớn nhất trong khí quyển Trái Đất?", options: ["Oxy", "Nitơ", "Cacbon đioxit", "Hydro"], answer: "Nitơ", explanation: "Khí Nitơ chiếm khoảng 78% bầu khí quyển." },
  { category: "Khoa học", question: "Tốc độ ánh sáng trong chân không xấp xỉ bao nhiêu km/s?", options: ["150.000", "300.000", "450.000", "600.000"], answer: "300.000", explanation: "Xấp xỉ 300.000 km/s." },
  { category: "Khoa học", question: "Cơ quan nào ở người có khả năng tự tái sinh lớn nhất?", options: ["Tim", "Phổi", "Gan", "Thận"], answer: "Gan", explanation: "Gan có khả năng tự phục hồi mô rất cao." },
  { category: "Khoa học", question: "Đơn vị đo cường độ dòng điện là gì?", options: ["Volt", "Ampere", "Ohm", "Watt"], answer: "Ampere", explanation: "Ký hiệu là A." },
  { category: "Khoa học", question: "Máu màu đỏ của con người do tế bào nào vận chuyển?", options: ["Bạch cầu", "Hồng cầu", "Tiểu cầu", "Huyết tương"], answer: "Hồng cầu", explanation: "Hồng cầu chứa huyết sắc tố (hemoglobin)." },
  { category: "Khoa học", question: "Nguyên tố hóa học nào nhẹ nhất trong bảng tuần hoàn?", options: ["Heli", "Hydro", "Liti", "Cacbon"], answer: "Hydro", explanation: "Hydro là nguyên tố nhẹ nhất và phổ biến nhất." },
  { category: "Khoa học", question: "Đại dương nào lớn nhất trên Trái Đất?", options: ["Đại Tây Dương", "Ấn Độ Dương", "Bắc Băng Dương", "Thái Bình Dương"], answer: "Thái Bình Dương", explanation: "Thái Bình Dương rộng lớn nhất." },
  { category: "Khoa học", question: "Lực nào giữ chúng ta ở trên mặt đất thay vì bay lơ lửng?", options: ["Lực từ", "Lực hấp dẫn", "Lực ma sát", "Lực đàn hồi"], answer: "Lực hấp dẫn", explanation: "Trọng lực của Trái Đất kéo mọi vật xuống." },
  { category: "Khoa học", question: "Nước sôi ở điều kiện tiêu chuẩn tại bao nhiêu độ C?", options: ["90°C", "100°C", "110°C", "120°C"], answer: "100°C", explanation: "Ở áp suất 1 atm, nước sôi ở 100 độ C." },
  { category: "Khoa học", question: "Loài động vật có vú nào duy nhất có khả năng bay lượn thực sự?", options: ["Sóc bay", "Dơi", "Chim cánh cụt", "Cá voi"], answer: "Dơi", explanation: "Dơi là động vật có vú bay thành thạo." },
  { category: "Khoa học", question: "Hành tinh nào được mệnh danh là Hành tinh Đỏ?", options: ["Sao Kim", "Sao Hỏa", "Sao Thổ", "Sao Mộc"], answer: "Sao Hỏa", explanation: "Do bề mặt chứa nhiều oxit sắt." },
  { category: "Khoa học", question: "Vitamin nào tổng hợp chủ yếu khi da tiếp xúc với ánh nắng mặt trời?", options: ["Vitamin A", "Vitamin B", "Vitamin C", "Vitamin D"], answer: "Vitamin D", explanation: "Tia UV giúp cơ thể tổng hợp vitamin D." },
  { category: "Khoa học", question: "Kim loại nào ở trạng thái lỏng ở nhiệt độ phòng?", options: ["Sắt", "Đồng", "Thủy ngân", "Nhôm"], answer: "Thủy ngân", explanation: "Thủy ngân (Hg) lỏng ở điều kiện thường." },
  { category: "Khoa học", question: "Cấu trúc di truyền của sinh vật lưu giữ dưới dạng gì?", options: ["RNA", "DNA", "Protein", Lipid], answer: "DNA", explanation: "DNA chứa thông tin di truyền." },
  { category: "Khoa học", question: "Sóng âm truyền nhanh nhất qua môi trường nào?", options: ["Chất khí", "Chất lỏng", "Chất rắn", "Chân không"], answer: "Chất rắn", explanation: "Mật độ phân tử chất rắn cao giúp truyền âm tốt nhất." },
  { category: "Khoa học", question: "Bệnh thiếu máu thường do cơ thể thiếu chất gì?", options: ["Canxi", "Sắt", "Kẽm", "Magie"], answer: "Sắt", explanation: "Sắt cần thiết để tạo hemoglobin." },
  { category: "Khoa học", question: "Tầng khí quyển nào nằm sát bề mặt Trái Đất nhất?", options: ["Tầng bình lưu", "Tầng đối lưu", "Tầng trung gian", "Tầng điện ly"], answer: "Tầng đối lưu", explanation: "Nơi diễn ra các hiện tượng thời tiết." },
  { category: "Khoa học", question: "Loài động vật lớn nhất từng tồn tại trên Trái Đất là gì?", options: ["Voi ma mút", "Cá voi xanh", "Khủng long bạo chúa", "Cá mập trắng"], answer: "Cá voi xanh", explanation: "Cá voi xanh là động vật khổng lồ." },
  { category: "Khoa học", question: "Cây xanh quang hợp tạo ra khí gì thải ra môi trường?", options: ["CO2", "Oxy", "Nitơ", "Hydro"], answer: "Oxy", explanation: "Cây hấp thụ CO2 và nhả ra O2." },
  { category: "Khoa học", question: "Hợp chất hóa học của nước có công thức là gì?", options: ["CO2", "H2O", "NaCl", "NH3"], answer: "H2O", explanation: "Gồm 2 nguyên tử H và 1 nguyên tử O." },
  { category: "Khoa học", question: "Lớp vỏ ngoài cùng của Trái Đất được gọi là gì?", options: ["Lớp manti", "Nhân ngoài", "Lớp vỏ địa cầu", "Nhân trong"], answer: "Lớp vỏ địa cầu", explanation: "Vỏ Trái Đất (Crust)." },
  { category: "Khoa học", question: "Côn trùng thuộc lớp động vật nào?", options: ["Có vú", "Thân mềm", "Chân khớp", "Bò sát"], answer: "Chân khớp", explanation: "Ngành chân khớp (Arthropoda)." },
  { category: "Khoa học", question: "Hiện tượng khúc xạ ánh sáng là gì?", options: ["Ánh sáng bị uốn cong khi qua 2 môi trường trong suốt", "Ánh sáng bị dội lại", "Ánh sáng bị hấp thụ hoàn toàn", "Ánh sáng đi thẳng"], answer: "Ánh sáng bị uốn cong khi qua 2 môi trường trong suốt", explanation: "Do vận tốc thay đổi khi qua môi trường khác nhau." },
  { category: "Khoa học", question: "Cơ quan nào lọc máu chính trong cơ thể người?", options: ["Gan", "Thận", "Tim", "Phổi"], answer: "Thận", explanation: "Thận lọc chất thải tạo ra nước tiểu." },

  // --- CÔNG NGHỆ & LẬP TRÌNH (26-50) ---
  { category: "Lập trình", question: "Ngôn ngữ lập trình do Brendan Eich tạo ra trong 10 ngày?", options: ["Python", "JavaScript", "C++", "Java"], answer: "JavaScript", explanation: "Ra đời năm 1995 tại Netscape." },
  { category: "Lập trình", question: "Hệ thống quản lý phiên bản mã nguồn phổ biến nhất thế giới là gì?", options: ["SVN", "Git", "Mercurial", "CVS"], answer: "Git", explanation: "Do Linus Torvalds sáng tạo." },
  { category: "Lập trình", question: "Thẻ HTML nào dùng để tạo tiêu đề lớn nhất?", options: ["<h6>", "<head>", "<h1>", "<p>"], answer: "<h1>", explanation: "H1 là thẻ heading lớn nhất." },
  { category: "Lập trình", question: "CSS viết tắt của từ gì?", options: ["Computer Style Sheets", "Cascading Style Sheets", "Creative Style System", "Colorful Style Sheet"], answer: "Cascading Style Sheets", explanation: "Dùng để thiết kế giao diện web." },
  { category: "Lập trình", question: "Đâu không phải là ngôn ngữ lập trình hướng đối tượng?", options: ["Java", "C++", "C", "Python"], answer: "C", explanation: "C là ngôn ngữ lập trình thủ tục (procedural)." },
  { category: "Lập trình", question: "Cổng mặc định của giao thức HTTP là gì?", options: ["21", "80", "443", "3306"], answer: "80", explanation: "HTTPS dùng cổng 443." },
  { category: "Lập trình", question: "Cấu trúc dữ liệu nào hoạt động theo nguyên tắc LIFO (Vào sau ra trước)?", options: ["Queue", "Stack", "Array", "Tree"], answer: "Stack", explanation: "Ngăn xếp (Stack)." },
  { category: "Lập trình", question: "Cấu trúc dữ liệu nào hoạt động theo nguyên tắc FIFO (Vào trước ra trước)?", options: ["Stack", "Queue", "Graph", "Map"], answer: "Queue", explanation: "Hàng đợi (Queue)." },
  { category: "Lập trình", question: "Hệ quản trị cơ sở dữ liệu quan hệ nào sử dụng cú pháp SQL?", options: ["MongoDB", "Redis", "MySQL", "Cassandra"], answer: "MySQL", explanation: "MySQL quản lý CSDL quan hệ." },
  { category: "Lập trình", question: "Lỗi 404 trên web có nghĩa là gì?", options: ["Lỗi máy chủ nội bộ", "Không tìm thấy trang", "Truy cập bị từ chối", "Hết hạn phiên"], answer: "Không tìm thấy trang", explanation: "Not Found." },
  { category: "Lập trình", question: "JavaScript chạy chủ yếu trên môi trường nào phía máy khách?", options: ["Trình duyệt web", "Hệ điều hành Windows", "BIOS", "Compiler"], answer: "Trình duyệt web", explanation: "Chạy trực tiếp trên browser." },
  { category: "Lập trình", question: "Framework JavaScript nào do Google phát triển?", options: ["React", "Vue", "Angular", "Svelte"], answer: "Angular", explanation: "AngularJS/Angular do Google hậu thuẫn." },
  { category: "Lập trình", question: "Thư viện giao diện UI nổi tiếng do Meta (Facebook) phát triển là gì?", options: ["React", "Django", "Laravel", "Spring"], answer: "React", explanation: "Thư viện frontend phổ biến." },
  { category: "Lập trình", question: "Lệnh Git nào dùng để tải code từ remote repository về máy?", options: ["git push", "git commit", "git pull", "git add"], answer: "git pull", explanation: "Đồng bộ code từ server về." },
  { category: "Lập trình", question: "Phần mềm giả lập môi trường chạy NodeJS phổ biến gọi là gì?", options: ["V8 Engine", "JVM", "CLR", "WebKit"], answer: "V8 Engine", explanation: "Google V8 biên dịch mã JS." },
  { category: "Lập trình", question: "Đâu là một NoSQL Database?", options: ["PostgreSQL", "MySQL", "MongoDB", "Oracle"], answer: "MongoDB", explanation: "Lưu trữ dữ liệu dạng document không có cấu trúc bảng cứng." },
  { category: "Lập trình", question: "Ký tự nào thường dùng để kết thúc một câu lệnh trong Java/C++?", options: [",", ";", ".", ":"], answer: ";", explanation: "Dấu chấm phẩy (semicolon)." },
  { category: "Lập trình", question: "Hàm nào dùng để in ra console trong JavaScript?", options: ["print()", "echo()", "console.log()", "printf()"], answer: "console.log()", explanation: "In thông tin ra bảng điều khiển." },
  { category: "Lập trình", question: "Biến cục bộ trong hàm có phạm vi hoạt động ở đâu?", options: ["Toàn bộ chương trình", "Chỉ bên trong hàm đó", "Ngoài file khác", "Toàn cục"], answer: "Chỉ bên trong hàm đó", explanation: "Scope giới hạn trong block/function." },
  { category: "Lập trình", question: "Đâu là phần mở rộng tiêu chuẩn của file mã nguồn JavaScript?", options: [".py", ".java", ".js", ".html"], answer: ".js", explanation: "Đuôi .js hoặc .mjs." },
  { category: "Lập trình", question: "Lệnh nào trong Git dùng để lưu lại các thay đổi vào lịch sử cục bộ?", options: ["git commit", "git clone", "git init", "git status"], answer: "git commit", explanation: "Đóng gói thay đổi kèm thông điệp." },
  { category: "Lập trình", question: "Đâu là một kiểu dữ liệu dạng chuỗi ký tự (String)?", options: ["123", "true", "\"Hello World\"", "3.14"], answer: "\"Hello World\"", text: "Nằm trong dấu ngoặc kép."},
  { category: "Lập trình", question: "Trong lập trình, toán tử '==' dùng để làm gì?", options: ["Gán giá trị", "So sánh bằng", "Chia lấy dư", "Phủ định"], answer: "So sánh bằng", explanation: "Kiểm tra sự tương đương." },
  { category: "Lập trình", question: "Ai là người sáng lập ra hệ điều hành Linux?", options: ["Bill Gates", "Steve Jobs", "Linus Torvalds", "Mark Zuckerberg"], answer: "Linus Torvalds", explanation: "Phát hành năm 1991." },
  { category: "Lập trình", question: "Trang web GitHub dùng để làm gì chủ yếu?", options: ["Chơi game", "Lưu trữ mã nguồn và quản lý dự án", "Xem phim trực tuyến", "Mua sắm"], answer: "Lưu trữ mã nguồn và quản lý dự án", explanation: "Nền tảng git hosting lớn nhất." },

  // --- LỊCH SỬ & ĐỊA LÝ (51-75) thủ đô, sự kiện ---
  { category: "Lịch sử & Địa lý", question: "Thủ đô của nước Việt Nam hiện nay là gì?", options: ["TP. Hồ Chí Minh", "Hà Nội", "Đà Nẵng", "Hải Phòng"], answer: "Hà Nội", explanation: "Trung tâm chính trị cả nước." },
  { category: "Lịch sử & Địa lý", question: "Quốc gia nào có diện tích lớn nhất thế giới?", options: ["Canada", "Trung Quốc", "Nga", "Mỹ"], answer: "Nga", explanation: "Nga trải dài qua nhiều múi giờ." },
  { category: "Lịch sử & Địa lý", question: "Năm nào chiến dịch Hồ Chí Minh lịch sử giải phóng hoàn toàn miền Nam?", options: ["1954", "1972", "1975", "1979"], answer: "1975", explanation: "Ngày 30/4/1975." },
  { category: "Lịch sử & Địa lý", question: "Sông nào dài nhất thế giới?", options: ["Sông Amazon", "Sông Nile", "Sông Trường Giang", "Sông Mê Kông"], answer: "Sông Nile", explanation: "Nằm ở lục địa châu Phi." },
  { category: "Lịch sử & Địa lý", question: "Vị vua nào đã dời đô từ Hoa Lư về Thăng Long vào năm 1010?", options: ["Đinh Tiên Hoàng", "Lý Thái Tổ", "Ngô Quyền", "Trần Nhân Tông"], answer: "Lý Thái Tổ", explanation: "Mở ra kỷ nguyên phát triển Thăng Long." },
  { category: "Lịch sử & Địa lý", question: "Tháp Eiffel nằm ở thành phố nào của thế giới?", options: ["London", "Berlin", "Paris", "Rome"], answer: "Paris", explanation: "Thủ đô nước Pháp." },
  { category: "Lịch sử & Địa lý", question: "Châu lục nào lạnh nhất trên Trái Đất?", options: ["Châu Âu", "Châu Á", "Châu Nam Cực", "Châu Mỹ"], answer: "Châu Nam Cực", explanation: "Bao phủ bởi băng tuyết vĩnh cửu." },
  { category: "Lịch sử & Địa lý", question: "Ai là tác giả của bản Tuyên ngôn Độc lập khai sinh nước Việt Nam Dân chủ Cộng hòa?", options: ["Phan Bội Châu", "Hồ Chí Minh", "Võ Nguyên Giáp", "Trường Chinh"], answer: "Hồ Chí Minh", explanation: "Đọc tại Quảng trường Ba Đình ngày 2/9/1945." },
  { category: "Lịch sử & Địa lý", question: "Kênh đào nào nối liền Địa Trung Hải với Biển Đỏ?", options: ["Kênh đào Panama", "Kênh đào Suez", "Kênh đào Kiel", "Kênh đào Corinth"], answer: "Kênh đào Suez", explanation: "Nằm ở đất nước Ai Cập." },
  { category: "Lịch sử & Địa lý", question: "Đỉnh núi nào cao nhất thế giới?", options: ["K2", "Kangchenjunga", "Everest", "Fansipan"], answer: "Everest", explanation: "Nằm trên dãy Himalaya." },
  { category: "Lịch sử & Địa lý", question: "Chiến thắng Điện Biên Phủ diễn ra vào năm nào?", options: ["1945", "1954", "1972", "1975"], answer: "1954", explanation: "Lừng lẫy năm châu, chấn động địa cầu." },
  { category: "Lịch sử & Địa lý", question: "Nước nào có dân số đông nhất thế giới hiện nay?", options: ["Mỹ", "Ấn Độ", "Trung Quốc", "Indonesia"], answer: "Ấn Độ", explanation: "Đã vượt qua Trung Quốc trong những năm gần đây." },
  { category: "Lịch sử & Địa lý", question: "Vạn Lý Long Thành (Vạn Lý Trường Thành) nằm ở quốc gia nào?", options: ["Nhật Bản", "Hàn Quốc", "Trung Quốc", "Mông Cổ"], answer: "Trung Quốc", explanation: "Công trình phòng thủ quân sự nổi tiếng." },
  { category: "Lịch sử & Địa lý", question: "Thủ đô của nước Nhật Bản là gì?", options: ["Osaka", "Kyoto", "Tokyo", "Hiroshima"], answer: "Tokyo", explanation: "Trung tâm kinh tế lớn." },
  { category: "Lịch sử & Địa lý", question: "Quốc gia nào có hình dáng giống như chữ S trên bản đồ thế giới?", options: ["Lào", "Việt Nam", "Ý", "Chile"], answer: "Việt Nam", explanation: "Đất nước hình chữ S ven biển." },
  { category: "Lịch sử & Địa lý", question: "Ai là người lãnh đạo cuộc khởi nghĩa Lam Sơn chống giặc Minh?",options: ["Trần Hưng Đạo", "Lê Lợi", "Nguyễn Trãi", "Quang Trung"], answer: "Lê Lợi", explanation: "Lê Lợi lên ngôi vua lập ra nhà Hậu Lê." },
  { category: "Lịch sử & Địa lý", question: "Châu lục nào có diện tích lớn nhất thế giới?", options: ["Châu Phi", "Châu Mỹ", "Châu Á", "Châu Âu"], answer: "Châu Á", options: ["Châu Phi", "Châu Mỹ", "Châu Á", "Châu Âu"], answer: "Châu Á", explanation: "Châu Á rộng lớn nhất." },
  { category: "Lịch sử & Địa lý", question: "Hồ nước ngọt lớn nhất Việt Nam nằm ở khu vực nào?", options: ["Hồ Tây (Hà Nội)", "Hồ Ba Bể (Bắc Kạn)", "Biển Hồ (Pleiku)", "Hồ Dầu Tiếng"], answer: "Hồ Ba Bể (Bắc Kạn)", explanation: "Hồ tự nhiên lớn ở vùng núi." },
  { category: "Lịch sử & Địa lý", question: "Vị tướng nào gắn liền với chiến thắng Bạch Đằng năm 938?", options: ["Trần Hưng Đạo", "Ngô Quyền", "Lý Thường Kiệt", "Đinh Bộ Lĩnh"], answer: "Ngô Quyền", explanation: "Đánh tan quân Nam Hán trên sông Bạch Đằng." },
  { category: "Lịch sử & Địa lý", question: "Nơi nào được mệnh danh là nóc nhà Đông Dương?", options: ["Đà Lạt", "Sa Pa", "Đỉnh Fansipan", "Mù Cang Chải"], answer: "Đỉnh Fansipan", explanation: "Cao 3.147m thuộc dãy Hoàng Liên Sơn." },
  { category: "Lịch sử & Địa lý", question: "Cuộc khởi nghĩa Hai Bà Trưng nổ ra vào năm nào?", options: ["40 SCN", "938 SCN", "1076 SCN", "1288 SCN"], answer: "40 SCN", explanation: "Chống lại ách đô hộ của nhà Hán." },
  { category: "Lịch sử & Địa lý", question: "Quốc gia nào nổi tiếng với biểu tượng Kim Tự Tháp?", options: ["Hy Lạp", "Ai Cập", "Mexico", "Ý"], answer: "Ai Cập", explanation: "Nền văn minh sông Nin cổ đại." },
  { category: "Lịch sử & Địa lý", question: "Thành phố nào của Việt Nam được mệnh danh là Thành phố Hoa Phượng Đỏ?", options: ["Hải Phòng", "Đà Nẵng", "Nha Trang", "Cần Thơ"], answer: "Hải Phòng", explanation: "Thành phố cảng hoa phượng đỏ." },
  { category: "Lịch sử & Địa lý", question: "Vị anh hùng nào lấy thân mình lấp lỗ châu mai trong chiến dịch Điện Biên Phủ?", options: ["Bế Văn Đàn", "Phan Đình Giót", "Trần Can", "Tô Vĩnh Diện"], answer: "Phan Đình Giót", explanation: "Gương hy sinh dũng cảm." },
  { category: "Lịch sử & Địa lý", question: "Eo biển nào ngăn cách giữa châu Á và châu Mỹ?", options: ["Eo biển Malacca", "Eo biển Bering", "Eo biển Gibraltar", "Eo biển Đan Mạch"], answer: "Eo biển Bering", explanation: "Nối liền Bắc Băng Dương và Thái Bình Dương." },

  // --- ĐỐ VUI MẸO & THƯỜNG THỨC (76-105) ---
  { category: "Đố vui mẹo", question: "Cái gì thuộc về bạn, nhưng người khác dùng nó nhiều hơn bạn?", options: ["Giấc mơ", "Tên của bạn", "Ví tiền", "Điện thoại"], answer: "Tên của bạn", explanation: "Người khác gọi tên bạn nhiều hơn." },
  { category: "Đố vui mẹo", question: "Bệnh gì mà bác sĩ phải bó tay?", options: ["Gãy tay", "Đau bụng", "Cảm cúm", "Đau đầu"], answer: "Gãy tay", explanation: "Gãy tay phải bó bột (bó tay)." },
  { category: "Đố vui mẹo", question: "Con gì đập thì sống, không đập thì chết?", options: ["Con tim", "Con muỗi", "Con rắn", "Con cá"], answer: "Con tim", explanation: "Tim đập để duy trì sự sống." },
  { category: "Đố vui mẹo", question: "Cái gì có mặt mà không có mắt, có chân mà không biết đi?", options: ["Cái bàn", "Cái ghế", "Đồng hồ", "Cái tủ"], answer: "Đồng hồ", explanation: "Có mặt đồng hồ và chân kim." },
  { category: "Đố vui mẹo", question: "Lịch nào dài nhất trong năm?", options: ["Lịch treo tường", "Lịch để bàn", "Lịch vạn niên", "Lịch âm"], answer: "Lịch vạn niên", explanation: "Vạn niên kéo dài vô tận." },
  { category: "Đố vui mẹo", question: "Cái gì chặt không đứt, bứt không rời, phơi không khô, đốt không cháy?", options: ["Nước", "Lửa", "Gió", "Đất"], answer: "Nước", explanation: "Đặc tính của chất lỏng nước." },
  { category: "Đố vui mẹo", question: "Con gì đầu dê mặt ngựa?", options: ["Con ngựa", "Con dê", "Con tôm", "Con cừu"], answer: "Con tôm", explanation: "Tôm (đầu dê mặt ngựa theo câu đố dân gian)." },
  { category: "Đố vui mẹo", question: "Có 1 con vịt đi trước 2 con vịt, đi sau 2 con vịt, đi giữa 2 con vịt. Hỏi có mấy con vịt?", options: ["2 con", "3 con", "4 con", "5 con"], answer: "3 con", explanation: "Đội hình hàng dọc: 1 con đi trước, 1 con giữa, 1 con sau." },
  { category: "Đố vui mẹo", question: "Cái gì càng kéo càng ngắn lại?", options: ["Sợi dây", "Điếu thuốc lá", "Con đường", "Tấm vải"], answer: "Điếu thuốc lá", explanation: "Hút thuốc thì điếu ngắn dần." },
  { category: "Đố vui mẹo", question: "Nhà Nam có 4 anh em trai, không có chị em gái. Hỏi nhà Nam có mấy người con?", options: ["4 người", "5 người", "6 người", "7 người"], answer: "4 người", explanation: "Toàn bộ là 4 anh em trai." },
  { category: "Đố vui mẹo", question: "Cái gì luôn đi đến mà không bao giờ đến nơi?", options: ["Dòng sông", "Ngày mai", "Gió", "Ánh sáng"], answer: "Ngày mai", explanation: "Ngày mai luôn ở tương lai." },
  { category: "Đố vui mẹo", question: "Con đường dài nhất là đường nào?", options: ["Đường cao tốc", "Đường đời", "Quốc lộ 1A", "Đường xích đạo"], answer: "Đường đời", explanation: "Đường đời dài rộng nhiều thử thách." },
  { category: "Đố vui mẹo", question: "Môn thể thao nào mà càng thắng càng thua?", options: ["Bóng đá", "Đua xe", "Đua ghe", "Cờ vua"], answer: "Đua ghe", explanation: "Đua ghe thtua vì chèo lùi (tùy câu chữ dân gian)." },
  { category: "Đố vui mẹo", question: "Con gì ăn lửa với than hồng?", options: ["Con rồng", "Con tàu lửa", "Con bò", "Con lợn"], answer: "Con tàu lửa", explanation: "Tàu hỏa chạy bằng hơi nước/than." },
  { category: "Đố vui mẹo", question: "Cái gì tay phải cầm được mà tay trái không thể cầm được?", options: ["Cái thìa", "Khuỷu tay trái", "Cái bút", "Cốc nước"], answer: "Khuỷu tay trái", explanation: "Tay phải không thể chạm khuỷu tay trái." },
  { category: "Đố vui mẹo", question: "Con gì sinh ra đã mang bộ áo giáp sắt trên mình?", options: ["Con cua", "Con rùa", "Con tê giác", "Con nhím"], answer: "Con rùa", explanation: "Mai rùa cứng như áo giáp." },
  { category: "Đố vui mẹo", question: "Để nguyên là ngọc sáng ngời, bỏ đầu thành sắc da trời là chữ gì?", options: ["Chữ Trai", "Chữ Ngọc", "Chữ Mây", "Chữ Vàng"], answer: "Chữ Ngọc", explanation: "Bỏ đầu thành chữ 'gọc' (gần giống màu xanh da trời/hoặc câu đố biến thể chữ ngọc thành lục)." },
  { category: "Đố vui mẹo", question: "Cái gì đen khi bạn mua nó, đỏ khi dùng nó, và xám khi vứt nó đi?", options: ["Than", "Cục than", "Gỗ", "Giấy"], answer: "Cục than", explanation: "Than đốt cháy đỏ rồi thành tro xám." },
  { category: "Đố vui mẹo", question: "Có 1 bà đi chợ thấy 1 con bò. Hỏi bà mất gì?", options: ["Mất tiền", "Mất thời gian", "Mất bò", "Không mất gì"], answer: "Mất thời gian", explanation: "Câu hỏi mẹo thư giãn." },
  { category: "Đố vui mẹo", question: "Cái gì người mua biết, người bán biết, người dùng không bao giờ biết?", options: ["Quan tài", "Quần áo", "Xe hơi", "Thuốc độc"], answer: "Quan tài", explanation: "Người dùng (người mất) không biết." },
  { category: "Đố vui mẹo", question: "Con mèo nào cực kỳ sợ nước?", options: ["Mèo mướp", "Mèo rừng", "Mèo ướt", "Mèo Ai Cập"], answer: "Mèo ướt", explanation: "Mèo ướt thì lúc nào chẳng sợ nước." },
  { category: "Đố vui mẹo", question: "Cái gì mà ai cũng muốn giấu nhưng khi lộ ra thì ai cũng thấy?", options: ["Tiền bạc", "Cái kim trong bọc", "Bí mật", "Tuổi tác"], answer: "Cái kim trong bọc", explanation: "Theo thành ngữ 'Kim trong bọc lâu ngày cũng có ngày lòi ra'." },
  { category: "Đố vui mẹo", question: "Con gì mang được cả miếng gỗ lớn nhưng không mang nổi một hạt cát?", options: ["Con sông", "Con kiến", "Con ốc", "Con tàu"], answer: "Con sông", explanation: "Sông chở bè gỗ nhưng cát chìm đáy." },
  { category: "Đố vui mẹo", question: "Cái gì bạn có thể giữ sau khi đã đưa nó cho người khác?", options: ["Tiền", "Lời hứa", "Cái tên của bạn", "Bí mật"], answer: "Cái tên của bạn", explanation: "Đưa tên cho người khác gọi nhưng mình vẫn giữ." },
  { category: "Đố vui mẹo", question: "Trứng vịt lộn luộc chín thì gọi là gì?", options: ["Trứng luộc", "Trứng vịt luộc", "Trứng vịt lộn chín", "Trứng cút"], answer: "Trứng vịt lộn chín", explanation: "Đã luộc chín rồi thì gọi thế." }
];

export default {
  data: new SlashCommandBuilder()
    .setName("dautri")
    .setDescription("Thử thách đấu trí với hơn 100 câu hỏi đa dạng mọi chủ đề"),
  
  run: async (client, interaction) => {
    // Chọn ngẫu nhiên 1 câu hỏi từ kho hơn 100 câu
    const qData = questionBank[Math.floor(Math.random() * questionBank.length)];

    // Xáo trộn vị trí các đáp án
    const shuffledOptions = [...qData.options].sort(() => Math.random() - 0.5);

    const optionLetters = ["🇦", "🇧", "🇨", "🇩"];
    const formattedOptions = shuffledOptions.map((opt, index) => {
      return `${optionLetters[index]} ${opt}`;
    }).join("\n");

    const embed = new EmbedBuilder()
      .setColor("#0099ff")
      .setTitle(`🧠 Sân Chơi Đấu Trí - Chủ đề: ${qData.category}`)
      .setDescription(`**${qData.question}**\n\n${formattedOptions}`)
      .setFooter({ text: `⏱️ Bạn có 30 giây để gõ đáp án chính xác xuống khung chat!` });

    await interaction.reply({ embeds: [embed] });

    const channel = interaction.channel;
    const filter = response => {
      return !response.author.bot && shuffledOptions.some(opt => opt.toLowerCase() === response.content.trim().toLowerCase());
    };

    const collector = channel.createMessageCollector({ filter, time: 30000, max: 1 });

    collector.on('collect', async m => {
      const userGuess = m.content.trim();
      const isCorrect = userGuess.toLowerCase() === qData.answer.toLowerCase();

      if (isCorrect) {
        await m.reply(`🎉 **Chính xác hoàn toàn, <@${m.author.id}>!** Bạn đã xuất sắc vượt qua câu hỏi đấu trí này.`);
      } else {
        await m.reply(`❌ Rất tiếc, câu trả lời chưa chính xác. Đáp án đúng phải là: **${qData.answer}**`);
      }
    });

    collector.on('end', async collected => {
      if (collected.size === 0) {
        await interaction.followUp(`⏰ Đã hết thời gian 30 giây! Không có ai đưa ra đáp án kịp thời. Đáp án đúng là: **${qData.answer}**`);
      }
    });
  },
};