import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import axiosClient from '../api/axiosClient';

// Dữ liệu giả lập (Mock UI)
const mockArticles = [
    { id: 1, title: 'Công nghệ AI 2026: Bước ngoặt mới', category: 'CÔNG NGHỆ', views: 15420, comments: 45, date: '10/04/2026' },
    { id: 2, title: 'Thị trường Bất động sản sôi động', category: 'BẤT ĐỘNG SẢN', views: 8900, comments: 12, date: '09/04/2026' },
    { id: 3, title: 'Startup Việt vươn tầm quốc tế', category: 'KINH TẾ', views: 24500, comments: 130, date: '08/04/2026' }
];

const StatisticsView = () => (
    <div className="space-y-4">
        <h3 className="text-xs font-black uppercase tracking-[0.2em] text-gray-500 mb-4">Hiệu suất hệ thống</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white p-6 border border-gray-200 shadow-sm border-l-4 border-l-blue-600 hover:-translate-y-1 transition transform duration-300">
                <p className="text-sm text-gray-500 font-bold uppercase">Tổng bài viết</p>
                <p className="text-3xl font-black mt-2">42</p>
                <p className="text-xs text-green-600 font-bold mt-2">↑ +3 tháng này</p>
            </div>
            <div className="bg-white p-6 border border-gray-200 shadow-sm border-l-4 border-l-red-500 hover:-translate-y-1 transition transform duration-300">
                <p className="text-sm text-gray-500 font-bold uppercase">Tổng lượt xem</p>
                <p className="text-3xl font-black mt-2">124.5K</p>
                <p className="text-xs text-green-600 font-bold mt-2">↑ +12% so với tuần trước</p>
            </div>
            <div className="bg-white p-6 border border-gray-200 shadow-sm border-l-4 border-l-green-500 hover:-translate-y-1 transition transform duration-300">
                <p className="text-sm text-gray-500 font-bold uppercase">Lượt Chia sẻ</p>
                <p className="text-3xl font-black mt-2">8,430</p>
            </div>
            <div className="bg-white p-6 border border-gray-200 shadow-sm border-l-4 border-l-purple-500 hover:-translate-y-1 transition transform duration-300">
                <p className="text-sm text-gray-500 font-bold uppercase">Lượt bình luận</p>
                <p className="text-3xl font-black mt-2">342</p>
                <p className="text-xs text-green-600 font-bold mt-2">↑ +15 bình luận mới</p>
            </div>
        </div>
    </div>
);

const EditorView = ({ article, handleChange, handleSubmit, loading, isEditing }) => (
    <div className="bg-white p-8 border border-gray-200 shadow-sm">
        <h3 className="text-xl font-black uppercase tracking-tighter mb-6 border-b pb-4">
            {isEditing ? "Chỉnh sửa bài viết" : "Soạn thảo bài báo mới"}
        </h3>
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-gray-700 mb-2">Tít chính (Tiêu đề)</label>
                    <input type="text" name="title" value={article.title} onChange={handleChange} required className="w-full border border-gray-300 p-3 outline-none focus:border-blue-500 text-lg font-serif font-bold" placeholder="Nhập tiêu đề bài báo..." />
                </div>
                <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-gray-700 mb-2">Tít phụ (Subtitle)</label>
                    <input type="text" name="subtitle" value={article.subtitle || ''} onChange={handleChange} className="w-full border border-gray-300 p-3 outline-none focus:border-blue-500 text-lg font-serif" placeholder="Nhập tít phụ..." />
                </div>
            </div>
            <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-gray-700 mb-2">Sapo (Đoạn tóm tắt đầu bài)</label>
                <textarea name="sapo" value={article.sapo} onChange={handleChange} rows="3" required className="w-full border border-gray-300 p-3 outline-none focus:border-blue-500 font-serif" placeholder="Viết đoạn sapo tóm tắt nội dung chính..."></textarea>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-gray-700 mb-2">URL Ảnh đại diện (Thumbnail)</label>
                    <input type="url" name="thumbnail" value={article.thumbnail} onChange={handleChange} required className="w-full border border-gray-300 p-3 outline-none focus:border-blue-500 text-sm" placeholder="https://..." />
                </div>
                <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-gray-700 mb-2">Chuyên mục</label>
                    <select name="category" value={article.category} onChange={handleChange} className="w-full border border-gray-300 p-3 outline-none focus:border-blue-500 text-sm font-bold">
                        <option value="XÃ HỘI">XÃ HỘI</option>
                        <option value="KINH TẾ">KINH TẾ</option>
                        <option value="GIẢI TRÍ">GIẢI TRÍ</option>
                        <option value="CÔNG NGHỆ">CÔNG NGHỆ</option>
                        <option value="ĐỜI SỐNG">ĐỜI SỐNG</option>
                    </select>
                </div>
            </div>
            <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-gray-700 mb-2">Nội dung bài viết</label>
                <textarea name="content" value={article.content} onChange={handleChange} rows="15" required className="w-full border border-gray-300 p-4 outline-none focus:border-blue-500 font-serif text-lg leading-relaxed" placeholder="Nhập nội dung chi tiết..."></textarea>
            </div>
            <div className="flex justify-end pt-4 border-t gap-3">
                <button
                    type="submit"
                    disabled={loading}
                    className={`${loading ? 'bg-gray-400' : 'bg-blue-700 hover:bg-blue-800'} text-white font-bold py-3 px-10 text-xs uppercase tracking-widest transition shadow-lg active:scale-95`}
                >
                    {loading ? 'Đang xử lý...' : (isEditing ? 'Lưu cập nhật' : 'Xuất bản bài viết')}
                </button>
            </div>
        </form>
    </div>
);

const SettingsView = () => (
    <div className="bg-white p-8 border border-gray-200 shadow-sm max-w-2xl">
        <h3 className="text-xl font-black uppercase tracking-tighter mb-6 border-b pb-4">Cài đặt tòa soạn</h3>
        <div className="space-y-6">
            <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-gray-700 mb-2">Tên hiển thị tác giả / Bút danh</label>
                <input type="text" className="w-full border border-gray-300 p-3 outline-none focus:border-blue-500" placeholder="Nhập bút danh của bạn..." />
            </div>
            <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-gray-700 mb-2">Email nhận thông báo hệ thống</label>
                <input type="email" className="w-full border border-gray-300 p-3 outline-none focus:border-blue-500" placeholder="email@example.com" />
            </div>
            <div className="pt-4 border-t">
                <button className="bg-black text-white font-bold py-3 px-8 text-xs uppercase tracking-widest hover:bg-gray-800 transition active:scale-95">
                    Lưu thay đổi
                </button>
            </div>
        </div>
    </div>
);

function Dashboard() {
    const location = useLocation();
    const navigate = useNavigate();

    // Quản lý trạng thái dữ liệu (API)
    const [articlesList, setArticlesList] = useState([]);

    const fetchArticles = async () => {
        try {
            const res = await axiosClient.get(`/news`);
            const rawData = Array.isArray(res) ? res : (res.data?.data || res.data || []);
            setArticlesList(Array.isArray(rawData) ? rawData : []);
        } catch (error) {
            console.error("Lỗi gọi API danh sách tin tức:", error);
        }
    };

    useEffect(() => {
        fetchArticles();
    }, []);

    const emptyArticle = { id: null, title: '', subtitle: '', sapo: '', thumbnail: '', category: 'XÃ HỘI', content: '', author: '' };
    const [article, setArticle] = useState(emptyArticle);
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setArticle(prev => ({ ...prev, [name]: value }));
    };

    const handleEdit = (articleToEdit) => {
        setArticle({
            ...articleToEdit,
            sapo: articleToEdit.summary || '',
            thumbnail: articleToEdit.image_url || '',
        });
        setIsEditing(true);
        navigate('/dashboard/create');
    };

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("CẢNH BÁO: Bạn có chắc chắn muốn xóa bài báo này khỏi hệ thống không?");
        if (confirmDelete) {
            try {
                // Lấy token từ localStorage
                const token = localStorage.getItem('token') || localStorage.getItem('ACCESS_TOKEN');
                await axiosClient.delete(`/news/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setArticlesList(prev => prev.filter(item => item.id !== id));
                alert("🗑 Đã xóa bài viết thành công!");
            } catch (error) {
                console.error(error);
                alert("Lỗi khi xóa bài viết!");
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // --- BƯỚC QUAN TRỌNG: Lấy Token ---
            const token = localStorage.getItem('token') || localStorage.getItem('ACCESS_TOKEN');
            if (!token) {
                alert("Vui lòng đăng nhập lại!");
                navigate('/login'); // Hoặc trang login của bạn
                return;
            }

            const formData = {
                title: article.title,
                summary: article.sapo, // Mapping sapo sang summary cho DB
                content: article.content,
                category: article.category,
                image_url: article.thumbnail, // Mapping thumbnail sang image_url cho DB
            };

            // --- GỬI API KÈM TOKEN ---
            if (isEditing) {
                await axiosClient.put(`/news/${article.id}`, formData, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                alert("✅ Đã cập nhật bài báo thành công!");
            } else {
                await axiosClient.post(`/news`, formData, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                alert("🚀 BÀI BÁO MỚI ĐÃ ĐƯỢC PHÁT HÀNH THÀNH CÔNG!");
            }

            await fetchArticles(); // Làm mới danh sách
            setArticle(emptyArticle);
            setIsEditing(false);
            navigate('/dashboard/manage');
        } catch (error) {
            console.error("Lỗi khi lưu bài viết:", error.response || error);
            alert(error.response?.data?.message || "Lỗi khi kết nối đến API lưu bài!");
        } finally {
            setLoading(false);
        }
    };

    const isActive = (path) => location.pathname.includes(path);

    const ManageView = () => (
        <div className="bg-white p-8 border border-gray-200 shadow-sm">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 pb-4 border-b gap-4">
                <h3 className="text-xl font-black uppercase tracking-tighter">Quản lý bài viết</h3>
                <Link to="/dashboard/create" onClick={() => { setArticle(emptyArticle); setIsEditing(false); }} className="bg-gray-900 text-white px-5 py-2.5 text-[11px] uppercase font-bold tracking-widest hover:bg-blue-600 transition shadow active:scale-95 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                    Tạo bài viết mới
                </Link>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50 text-[10px] font-black tracking-widest uppercase text-gray-500">
                            <th className="p-4 border-b border-gray-200">#</th>
                            <th className="p-4 border-b border-gray-200 w-1/3">Tiêu đề bài viết</th>
                            <th className="p-4 border-b border-gray-200">Chuyên mục</th>
                            <th className="p-4 border-b border-gray-200">Lượt Xem</th>
                            <th className="p-4 border-b border-gray-200">Ngày đăng</th>
                            <th className="p-4 border-b border-gray-200 text-right">Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {articlesList.length > 0 ? articlesList.map((item, idx) => (
                            <tr key={item.id} className="border-b border-gray-100 hover:bg-blue-50/50 transition">
                                <td className="p-4 text-[11px] text-gray-400 font-bold">{idx + 1}</td>
                                <td className="p-4 font-bold text-sm text-blue-900 cursor-pointer hover:underline">{item.title}</td>
                                <td className="p-4">
                                    <span className="bg-blue-50 text-blue-700 px-2 py-1 text-[9px] uppercase font-black tracking-widest rounded shadow-sm">{item.category}</span>
                                </td>
                                <td className="p-4 text-xs font-semibold text-gray-600">
                                    <span className="text-gray-900 font-bold">{(item.views || 0).toLocaleString()}</span>
                                </td>
                                <td className="p-4 text-[11px] font-bold tracking-widest text-gray-400">{item.created_at?.split('T')[0] || item.date}</td>
                                <td className="p-4 text-right space-x-2">
                                    <button onClick={() => handleEdit(item)} className="text-[10px] bg-yellow-100 text-yellow-800 font-bold uppercase tracking-wider px-3 py-2 rounded hover:bg-yellow-200 transition shadow-sm active:scale-95">Sửa</button>
                                    <button onClick={() => handleDelete(item.id)} className="text-[10px] bg-red-100 text-red-700 font-bold uppercase tracking-wider px-3 py-2 rounded hover:bg-red-200 transition shadow-sm active:scale-95">Xóa</button>
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan="6" className="p-10 text-center text-gray-400 font-medium italic text-sm">Chưa có bài viết nào trong hệ thống.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 flex font-sans">
            {/* Thanh menu Sidebar */}
            <aside className="w-64 bg-[#1a1a1a] text-white p-6 hidden md:block border-r border-gray-800">
                <Link to="/" className="block text-2xl font-black uppercase tracking-widest mb-10 font-serif hover:text-blue-400 transition">TÒA SOẠN<span className="text-blue-500">.</span></Link>
                <nav className="space-y-2 text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400 w-full">
                    <Link to="/dashboard/stats" className={`block px-4 py-4 rounded-xl transition ${isActive('stats') ? 'text-white bg-blue-600 shadow-md' : 'hover:text-white hover:bg-gray-800'}`}>Thống kê chung</Link>
                    <Link to="/dashboard/manage" className={`block px-4 py-4 rounded-xl transition ${isActive('manage') ? 'text-white bg-blue-600 shadow-md' : 'hover:text-white hover:bg-gray-800'}`}>Quản lý tin báo</Link>
                    <Link to="/dashboard/create" onClick={() => { setArticle(emptyArticle); setIsEditing(false); }} className={`block px-4 py-4 rounded-xl transition ${isActive('create') ? 'text-white bg-blue-600 shadow-md' : 'hover:text-white hover:bg-gray-800'}`}>Viết bài mới</Link>
                    <Link to="/dashboard/settings" className={`block px-4 py-4 rounded-xl transition ${isActive('settings') ? 'text-white bg-blue-600 shadow-md' : 'hover:text-white hover:bg-gray-800'}`}>Cài đặt & Vai trò</Link>
                </nav>
            </aside>

            {/* Vùng hiển thị nội dung bên phải */}
            <main className="flex-1 p-4 md:p-10 h-screen overflow-y-auto">
                <div className="flex justify-between items-center mb-8 border-b border-gray-200 pb-4">
                    <div className="text-sm font-bold text-gray-500 tracking-wider">MÃ DASHBOARD: #ADM-2026</div>
                    <div className="flex items-center gap-4">
                        <Link to="/" className="text-xs font-bold uppercase tracking-widest text-blue-600 hover:underline">Quay về Web</Link>
                    </div>
                </div>

                <div className="max-w-6xl mx-auto">
                    <Routes>
                        <Route path="stats" element={<StatisticsView />} />
                        <Route path="create" element={<EditorView article={article} handleChange={handleChange} handleSubmit={handleSubmit} loading={loading} isEditing={isEditing} />} />
                        <Route path="manage" element={<ManageView />} />
                        <Route path="settings" element={<SettingsView />} />
                        <Route path="/" element={<StatisticsView />} />
                    </Routes>
                </div>
            </main>
        </div>
    );
}

export default Dashboard;