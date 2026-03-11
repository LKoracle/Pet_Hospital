import { useState } from "react";

// Mock Data
const MOCK_CUSTOMERS = [
  {
    id: 1, name: "张晓明", phone: "138****6721", gender: "男",
    level: "黄金会员", balance: 2680, points: 1340, source: "美团",
    registerDate: "2024-03-15", lastVisit: "2025-03-08",
    remark: "偏好进口粮，价格不敏感",
    tags: ["高价值", "老客户"],
    coupons: 3,
    cards: [{ name: "洗澡10次卡", remain: 3, total: 10 }, { name: "美容5次卡", remain: 5, total: 5 }],
    pets: [
      {
        id: 101, name: "旺财", avatar: "🐕", species: "狗", breed: "金毛寻回犬",
        birthday: "2022-06-10", age: "2岁9个月", weight: 28.5,
        gender: "公", neutered: true, temperament: ["亲人"],
        lastVaccine: "2024-12-01", nextVaccine: "2025-03-01", vaccineOverdue: true,
        lastDeworming: "2025-01-15", allergies: ["鸡肉蛋白"],
        medicalRecords: [
          { date: "2025-03-08", doctor: "李医生", diagnosis: "左前肢皮肤真菌感染", prescription: "外用特比萘芬喷剂 + 口服伊曲康唑", attachment: true },
          { date: "2025-01-10", doctor: "王医生", diagnosis: "年度体检-各项正常", prescription: "常规驱虫药", attachment: true },
          { date: "2024-09-22", doctor: "李医生", diagnosis: "急性肠胃炎", prescription: "蒙脱石散+益生菌+处方粮", attachment: false },
        ],
        groomRecords: [
          { date: "2025-02-20", groomer: "小陈", service: "全套洗护+造型", hasBefore: true, hasAfter: true },
          { date: "2025-01-05", groomer: "小陈", service: "基础洗浴", hasBefore: false, hasAfter: true },
        ],
        billingRecords: [
          { date: "2025-03-08", items: "皮肤科诊疗+药品", amount: 380 },
          { date: "2025-02-20", items: "全套洗护+造型(次卡)", amount: 0 },
          { date: "2025-01-10", items: "年度体检套餐", amount: 520 },
        ]
      },
      {
        id: 102, name: "咪咪", avatar: "🐈", species: "猫", breed: "布偶猫",
        birthday: "2023-09-01", age: "1岁6个月", weight: 4.2,
        gender: "母", neutered: true, temperament: ["胆小"],
        lastVaccine: "2025-01-20", nextVaccine: "2026-01-20", vaccineOverdue: false,
        lastDeworming: "2025-02-10", allergies: [],
        medicalRecords: [
          { date: "2025-01-20", doctor: "王医生", diagnosis: "疫苗接种-猫三联加强", prescription: "妙三多", attachment: true },
        ],
        groomRecords: [],
        billingRecords: [
          { date: "2025-01-20", items: "猫三联疫苗接种", amount: 120 },
        ]
      }
    ]
  },
  {
    id: 2, name: "李美琪", phone: "139****8832", gender: "女",
    level: "普通会员", balance: 500, points: 260, source: "微信小程序",
    registerDate: "2024-11-02", lastVisit: "2025-03-05",
    remark: "", tags: ["新客户"],
    coupons: 1, cards: [],
    pets: [
      {
        id: 201, name: "豆豆", avatar: "🐩", species: "狗", breed: "泰迪犬",
        birthday: "2024-01-15", age: "1岁2个月", weight: 3.8,
        gender: "公", neutered: false, temperament: ["亲人", "咬人预警"],
        lastVaccine: "2024-12-10", nextVaccine: "2025-03-10", vaccineOverdue: true,
        lastDeworming: "2025-02-01", allergies: [],
        medicalRecords: [
          { date: "2025-03-05", doctor: "李医生", diagnosis: "耳道感染（左耳）", prescription: "耳肤灵+洗耳液", attachment: true },
        ],
        groomRecords: [
          { date: "2025-02-28", groomer: "小张", service: "泰迪造型", hasBefore: true, hasAfter: true },
        ],
        billingRecords: [
          { date: "2025-03-05", items: "耳科诊疗+药品", amount: 210 },
          { date: "2025-02-28", items: "泰迪造型", amount: 180 },
        ]
      }
    ]
  },
  {
    id: 3, name: "王建国", phone: "136****4451", gender: "男",
    level: "钻石会员", balance: 8200, points: 5680, source: "自然进店",
    registerDate: "2023-06-20", lastVisit: "2025-03-10",
    remark: "VIP客户，三只猫定期洗护", tags: ["高价值", "VIP"],
    coupons: 5, cards: [{ name: "洗澡20次卡", remain: 12, total: 20 }],
    pets: [
      { id: 301, name: "大橘", avatar: "🐈", species: "猫", breed: "橘猫", birthday: "2021-03-10", age: "4岁", weight: 6.8, gender: "公", neutered: true, temperament: ["亲人"], lastVaccine: "2025-02-01", nextVaccine: "2026-02-01", vaccineOverdue: false, lastDeworming: "2025-02-01", allergies: ["磺胺类药物"], medicalRecords: [], groomRecords: [], billingRecords: [] },
      { id: 302, name: "二花", avatar: "🐈", species: "猫", breed: "英短蓝猫", birthday: "2022-07-20", age: "2岁8个月", weight: 5.1, gender: "母", neutered: true, temperament: ["胆小"], lastVaccine: "2025-02-01", nextVaccine: "2026-02-01", vaccineOverdue: false, lastDeworming: "2025-02-01", allergies: [], medicalRecords: [], groomRecords: [], billingRecords: [] },
      { id: 303, name: "三宝", avatar: "🐈", species: "猫", breed: "美短虎斑", birthday: "2023-12-01", age: "1岁3个月", weight: 3.9, gender: "公", neutered: false, temperament: ["亲人", "抓人预警"], lastVaccine: "2024-11-20", nextVaccine: "2025-02-20", vaccineOverdue: true, lastDeworming: "2025-01-15", allergies: [], medicalRecords: [], groomRecords: [], billingRecords: [] },
    ]
  },
  {
    id: 4, name: "赵薇薇", phone: "158****2209", gender: "女",
    level: "普通会员", balance: 0, points: 80, source: "美团",
    registerDate: "2025-02-10", lastVisit: "2025-02-10",
    remark: "", tags: ["新客户"],
    coupons: 0, cards: [],
    pets: [
      { id: 401, name: "皮蛋", avatar: "🐕", species: "狗", breed: "柯基犬", birthday: "2024-05-20", age: "10个月", weight: 9.2, gender: "公", neutered: false, temperament: ["亲人"], lastVaccine: "2025-02-10", nextVaccine: "2025-05-10", vaccineOverdue: false, lastDeworming: "2025-02-10", allergies: [], medicalRecords: [{ date: "2025-02-10", doctor: "王医生", diagnosis: "首诊体检+疫苗接种", prescription: "卫佳五", attachment: true }], groomRecords: [], billingRecords: [{ date: "2025-02-10", items: "体检+疫苗", amount: 260 }] }
    ]
  },
];

const LEVEL_COLORS = {
  "钻石会员": { bg: "#ede9fe", text: "#6d28d9", border: "#c4b5fd" },
  "黄金会员": { bg: "#fef3c7", text: "#92400e", border: "#fcd34d" },
  "普通会员": { bg: "#f1f5f9", text: "#475569", border: "#cbd5e1" },
};

const TEMPERAMENT_STYLES = {
  "亲人": { bg: "#dcfce7", text: "#166534" },
  "胆小": { bg: "#fef9c3", text: "#854d0e" },
  "咬人预警": { bg: "#fee2e2", text: "#991b1b" },
  "抓人预警": { bg: "#fee2e2", text: "#991b1b" },
};

// ─── Icons ────────────────────────────
const SearchIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>;
const PlusIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>;
const ChevronRight = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="9 18 15 12 9 6"/></svg>;
const XIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>;
const BackIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>;
const DownloadIcon = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>;
const CalendarIcon = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>;
const FileIcon = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>;

// ─── Shared Styles ────────────────────
const fontStack = `'DM Sans', 'Noto Sans SC', -apple-system, sans-serif`;

// ─── Components ───────────────────────

// Badge
function Badge({ children, bg, text, border }) {
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", padding: "2px 10px",
      borderRadius: "999px", fontSize: "11.5px", fontWeight: 600, lineHeight: "20px",
      background: bg, color: text, border: border ? `1px solid ${border}` : "none",
      whiteSpace: "nowrap",
    }}>{children}</span>
  );
}

// Pet Tag inline
function PetTag({ pet }) {
  const icon = pet.species === "猫" ? "🐱" : "🐶";
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 4, padding: "2px 10px",
      borderRadius: "999px", fontSize: "12px", fontWeight: 500, lineHeight: "20px",
      background: pet.species === "猫" ? "#fdf4ff" : "#eff6ff",
      color: pet.species === "猫" ? "#86198f" : "#1e40af",
      border: `1px solid ${pet.species === "猫" ? "#f0abfc" : "#93c5fd"}`,
    }}>{icon} {pet.name}({pet.breed})</span>
  );
}

// ─── List Page ────────────────────────
function ListPage({ onViewDetail, onOpenCreate }) {
  const [search, setSearch] = useState("");
  const [levelFilter, setLevelFilter] = useState("全部");
  const [speciesFilter, setSpeciesFilter] = useState("全部");

  const filtered = MOCK_CUSTOMERS.filter(c => {
    const matchSearch = !search ||
      c.name.includes(search) || c.phone.includes(search) ||
      c.pets.some(p => p.name.includes(search));
    const matchLevel = levelFilter === "全部" || c.level === levelFilter;
    const matchSpecies = speciesFilter === "全部" ||
      c.pets.some(p => speciesFilter === "猫" ? p.species === "猫" : speciesFilter === "狗" ? p.species === "狗" : false);
    return matchSearch && matchLevel && matchSpecies;
  });

  const selectStyle = {
    padding: "8px 12px", borderRadius: 8, border: "1px solid #e2e8f0",
    fontSize: 13, color: "#334155", background: "#fff", cursor: "pointer",
    outline: "none", fontFamily: fontStack,
  };

  return (
    <div>
      {/* Filter Bar */}
      <div style={{
        display: "flex", alignItems: "center", gap: 12, marginBottom: 20,
        flexWrap: "wrap",
      }}>
        <div style={{
          display: "flex", alignItems: "center", gap: 8, flex: 1, minWidth: 240,
          padding: "8px 14px", borderRadius: 10, border: "1px solid #e2e8f0",
          background: "#fff",
        }}>
          <SearchIcon />
          <input
            placeholder="搜索客户姓名、手机号、宠物昵称..."
            value={search} onChange={e => setSearch(e.target.value)}
            style={{
              border: "none", outline: "none", flex: 1, fontSize: 13,
              fontFamily: fontStack, color: "#1e293b", background: "transparent",
            }}
          />
        </div>
        <select value={levelFilter} onChange={e => setLevelFilter(e.target.value)} style={selectStyle}>
          <option>全部</option>
          <option>钻石会员</option>
          <option>黄金会员</option>
          <option>普通会员</option>
        </select>
        <select value={speciesFilter} onChange={e => setSpeciesFilter(e.target.value)} style={selectStyle}>
          <option>全部</option>
          <option>猫</option>
          <option>狗</option>
        </select>
        <div style={{ flex: 1 }} />
        <button onClick={onOpenCreate} style={{
          display: "flex", alignItems: "center", gap: 6, padding: "9px 20px",
          borderRadius: 10, border: "none", background: "#2563eb", color: "#fff",
          fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: fontStack,
          boxShadow: "0 1px 3px rgba(37,99,235,0.3)",
        }}>
          <PlusIcon /> 新建客户及宠物
        </button>
        <button style={{
          display: "flex", alignItems: "center", gap: 6, padding: "9px 16px",
          borderRadius: 10, border: "1px solid #e2e8f0", background: "#fff",
          fontSize: 13, fontWeight: 500, cursor: "pointer", fontFamily: fontStack, color: "#475569",
        }}>
          <DownloadIcon /> 导出
        </button>
      </div>

      {/* Table */}
      <div style={{
        background: "#fff", borderRadius: 14, overflow: "hidden",
        border: "1px solid #e9edf3",
        boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
      }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ background: "#f8fafc" }}>
              {["客户姓名", "手机号", "会员等级", "账户余额", "旗下宠物", "最近到店", "操作"].map(h => (
                <th key={h} style={{
                  padding: "13px 16px", textAlign: "left", fontWeight: 600,
                  color: "#64748b", fontSize: 12, borderBottom: "1px solid #e9edf3",
                  letterSpacing: "0.02em",
                }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((c, i) => (
              <tr key={c.id} style={{
                borderBottom: i < filtered.length - 1 ? "1px solid #f1f5f9" : "none",
                transition: "background 0.15s",
              }}
                onMouseEnter={e => e.currentTarget.style.background = "#f8fafc"}
                onMouseLeave={e => e.currentTarget.style.background = "transparent"}
              >
                <td style={{ padding: "14px 16px", fontWeight: 600, color: "#0f172a" }}>{c.name}</td>
                <td style={{ padding: "14px 16px", color: "#475569" }}>{c.phone}</td>
                <td style={{ padding: "14px 16px" }}>
                  <Badge {...LEVEL_COLORS[c.level]}>{c.level}</Badge>
                </td>
                <td style={{ padding: "14px 16px", fontWeight: 600, color: c.balance > 0 ? "#059669" : "#94a3b8" }}>
                  ¥{c.balance.toLocaleString()}
                </td>
                <td style={{ padding: "14px 16px" }}>
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                    {c.pets.map(p => <PetTag key={p.id} pet={p} />)}
                  </div>
                </td>
                <td style={{ padding: "14px 16px", color: "#64748b" }}>{c.lastVisit}</td>
                <td style={{ padding: "14px 16px" }}>
                  <div style={{ display: "flex", gap: 6 }}>
                    <button onClick={() => onViewDetail(c)} style={{
                      padding: "5px 12px", borderRadius: 6, border: "1px solid #e2e8f0",
                      background: "#fff", fontSize: 12, color: "#2563eb", cursor: "pointer",
                      fontWeight: 500, fontFamily: fontStack,
                    }}>查看详情</button>
                    <button style={{
                      padding: "5px 12px", borderRadius: 6, border: "1px solid #e2e8f0",
                      background: "#fff", fontSize: 12, color: "#475569", cursor: "pointer",
                      fontWeight: 500, fontFamily: fontStack,
                    }}>快捷预约</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div style={{ padding: 60, textAlign: "center", color: "#94a3b8", fontSize: 14 }}>
            暂无匹配的客户数据
          </div>
        )}
      </div>
      <div style={{ marginTop: 14, fontSize: 12, color: "#94a3b8", textAlign: "right" }}>
        共 {filtered.length} 条记录
      </div>
    </div>
  );
}

// ─── Create Drawer ────────────────────
function CreateDrawer({ visible, onClose }) {
  const [petCount, setPetCount] = useState(1);
  if (!visible) return null;

  const labelStyle = { display: "block", fontSize: 12, fontWeight: 600, color: "#475569", marginBottom: 6 };
  const inputStyle = {
    width: "100%", padding: "9px 12px", borderRadius: 8, border: "1px solid #e2e8f0",
    fontSize: 13, fontFamily: fontStack, color: "#1e293b", outline: "none", boxSizing: "border-box",
  };

  return (
    <>
      <div onClick={onClose} style={{
        position: "fixed", inset: 0, background: "rgba(0,0,0,0.3)",
        zIndex: 998, backdropFilter: "blur(2px)",
      }} />
      <div style={{
        position: "fixed", right: 0, top: 0, bottom: 0, width: 520,
        background: "#fff", zIndex: 999, display: "flex", flexDirection: "column",
        boxShadow: "-8px 0 30px rgba(0,0,0,0.12)",
        animation: "slideIn 0.25s ease-out",
      }}>
        <style>{`@keyframes slideIn { from { transform: translateX(100%); } to { transform: translateX(0); } }`}</style>
        {/* Header */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "20px 24px", borderBottom: "1px solid #f1f5f9",
        }}>
          <h3 style={{ margin: 0, fontSize: 17, fontWeight: 700, color: "#0f172a" }}>新建客户及宠物</h3>
          <button onClick={onClose} style={{
            background: "#f1f5f9", border: "none", borderRadius: 8, width: 32, height: 32,
            display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
          }}><XIcon /></button>
        </div>
        {/* Body */}
        <div style={{ flex: 1, overflow: "auto", padding: 24 }}>
          {/* Section: Customer */}
          <div style={{
            padding: "6px 12px", borderRadius: 6, background: "#eff6ff",
            fontSize: 13, fontWeight: 600, color: "#1d4ed8", marginBottom: 18,
          }}>客户基础信息</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px 16px", marginBottom: 24 }}>
            <div>
              <label style={labelStyle}>手机号码 *</label>
              <input placeholder="输入后自动校验是否已存在" style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>客户姓名 *</label>
              <input placeholder="请输入姓名" style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>客户性别</label>
              <select style={inputStyle}>
                <option>男</option><option>女</option><option>未知</option>
              </select>
            </div>
            <div>
              <label style={labelStyle}>客户来源</label>
              <select style={inputStyle}>
                <option>美团</option><option>自然进店</option><option>微信小程序</option><option>朋友推荐</option>
              </select>
            </div>
            <div style={{ gridColumn: "1 / -1" }}>
              <label style={labelStyle}>客户备注</label>
              <textarea placeholder="记录客户特殊偏好或注意事项..." rows={2} style={{ ...inputStyle, resize: "vertical" }} />
            </div>
          </div>

          {/* Section: Pets */}
          {Array.from({ length: petCount }).map((_, idx) => (
            <div key={idx} style={{ marginBottom: 20 }}>
              <div style={{
                padding: "6px 12px", borderRadius: 6, background: "#fdf4ff",
                fontSize: 13, fontWeight: 600, color: "#86198f", marginBottom: 18,
                display: "flex", justifyContent: "space-between", alignItems: "center",
              }}>
                <span>宠物信息 #{idx + 1}</span>
                {idx > 0 && <button onClick={() => setPetCount(p => p - 1)} style={{
                  background: "none", border: "none", color: "#dc2626", fontSize: 12, cursor: "pointer", fontWeight: 600,
                }}>移除</button>}
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px 16px" }}>
                <div>
                  <label style={labelStyle}>宠物昵称 *</label>
                  <input placeholder="请输入昵称" style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>宠物种类 *</label>
                  <select style={inputStyle}>
                    <option>狗</option><option>猫</option><option>其他</option>
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>宠物品种</label>
                  <input placeholder="支持拼音检索 如 JM=金毛" style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>生日</label>
                  <input type="date" style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>性别及绝育</label>
                  <select style={inputStyle}>
                    <option>公-未绝育</option><option>公-已绝育</option>
                    <option>母-未绝育</option><option>母-已绝育</option>
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>体重(kg)</label>
                  <input type="number" placeholder="0.0" step="0.1" style={inputStyle} />
                </div>
                <div style={{ gridColumn: "1 / -1" }}>
                  <label style={labelStyle}>性格预警</label>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    {["亲人", "胆小", "⚠️咬人预警", "⚠️抓人预警"].map(t => (
                      <label key={t} style={{
                        display: "flex", alignItems: "center", gap: 4, padding: "5px 12px",
                        borderRadius: 999, border: "1px solid #e2e8f0", fontSize: 12,
                        cursor: "pointer", background: "#f8fafc",
                      }}>
                        <input type="checkbox" style={{ accentColor: "#2563eb" }} /> {t}
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
          <button onClick={() => setPetCount(p => p + 1)} style={{
            width: "100%", padding: "10px", borderRadius: 8, border: "1.5px dashed #c4b5fd",
            background: "#faf5ff", color: "#7c3aed", fontSize: 13, fontWeight: 600,
            cursor: "pointer", fontFamily: fontStack, marginBottom: 10,
          }}>+ 添加另一只宠物</button>
        </div>
        {/* Footer */}
        <div style={{
          display: "flex", gap: 10, padding: "16px 24px",
          borderTop: "1px solid #f1f5f9", justifyContent: "flex-end",
        }}>
          <button onClick={onClose} style={{
            padding: "9px 20px", borderRadius: 8, border: "1px solid #e2e8f0",
            background: "#fff", fontSize: 13, fontWeight: 500, cursor: "pointer", fontFamily: fontStack, color: "#475569",
          }}>取消</button>
          <button style={{
            padding: "9px 20px", borderRadius: 8, border: "none",
            background: "#2563eb", color: "#fff", fontSize: 13, fontWeight: 600,
            cursor: "pointer", fontFamily: fontStack,
          }}>保存</button>
          <button style={{
            padding: "9px 20px", borderRadius: 8, border: "none",
            background: "#059669", color: "#fff", fontSize: 13, fontWeight: 600,
            cursor: "pointer", fontFamily: fontStack,
          }}>保存并去开单</button>
        </div>
      </div>
    </>
  );
}

// ─── Detail Page ──────────────────────
function DetailPage({ customer, onBack }) {
  const [activePetIdx, setActivePetIdx] = useState(0);
  const [activeTab, setActiveTab] = useState("medical");
  const [addPetDrawerOpen, setAddPetDrawerOpen] = useState(false);
  const pet = customer.pets[activePetIdx];

  return (
    <div>
      <button onClick={onBack} style={{
        display: "flex", alignItems: "center", gap: 6, background: "none",
        border: "none", color: "#64748b", fontSize: 13, cursor: "pointer",
        fontFamily: fontStack, marginBottom: 16, padding: 0, fontWeight: 500,
      }}><BackIcon /> 返回列表</button>

      <div style={{ display: "flex", gap: 24, alignItems: "flex-start" }}>
        {/* ─── Left Panel ─── */}
        <div style={{ width: 300, flexShrink: 0, display: "flex", flexDirection: "column", gap: 16 }}>
          {/* Profile Card */}
          <div style={{
            background: "#fff", borderRadius: 14, padding: 24,
            border: "1px solid #e9edf3",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 18 }}>
              <div style={{
                width: 52, height: 52, borderRadius: "50%", display: "flex",
                alignItems: "center", justifyContent: "center", fontSize: 22,
                background: "linear-gradient(135deg, #eff6ff, #dbeafe)",
                border: "2px solid #bfdbfe",
              }}>{customer.gender === "女" ? "👩" : "👨"}</div>
              <div>
                <div style={{ fontSize: 17, fontWeight: 700, color: "#0f172a" }}>{customer.name}</div>
                <div style={{ fontSize: 12, color: "#94a3b8", marginTop: 2 }}>{customer.phone}</div>
              </div>
            </div>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 14 }}>
              <Badge {...LEVEL_COLORS[customer.level]}>{customer.level}</Badge>
              {customer.tags.map(t => (
                <Badge key={t} bg="#f0fdf4" text="#166534" border="#bbf7d0">{t}</Badge>
              ))}
            </div>
            <div style={{ fontSize: 12, color: "#94a3b8", marginBottom: 4 }}>
              <span>来源：{customer.source}</span>
              <span style={{ margin: "0 8px" }}>|</span>
              <span>注册：{customer.registerDate}</span>
            </div>
            {customer.remark && (
              <div style={{
                marginTop: 12, padding: "8px 12px", borderRadius: 8,
                background: "#fffbeb", fontSize: 12, color: "#92400e",
                border: "1px solid #fde68a", lineHeight: 1.5,
              }}>{customer.remark}</div>
            )}
            <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
              <button style={{
                flex: 1, padding: "8px", borderRadius: 8, border: "1px solid #e2e8f0",
                background: "#fff", fontSize: 12, fontWeight: 500, cursor: "pointer",
                fontFamily: fontStack, color: "#2563eb",
              }}>编辑资料</button>
              <button style={{
                flex: 1, padding: "8px", borderRadius: 8, border: "1px solid #e2e8f0",
                background: "#fff", fontSize: 12, fontWeight: 500, cursor: "pointer",
                fontFamily: fontStack, color: "#475569",
              }}>发送短信</button>
            </div>
          </div>

          {/* Asset Panel */}
          <div style={{
            background: "#fff", borderRadius: 14, padding: 20,
            border: "1px solid #e9edf3",
          }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#0f172a", marginBottom: 16 }}>数字资产</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <div style={{ padding: 12, borderRadius: 10, background: "#f0fdf4", textAlign: "center" }}>
                <div style={{ fontSize: 20, fontWeight: 800, color: "#059669" }}>¥{customer.balance.toLocaleString()}</div>
                <div style={{ fontSize: 11, color: "#6b7280", marginTop: 2 }}>储值余额</div>
              </div>
              <div style={{ padding: 12, borderRadius: 10, background: "#fef3c7", textAlign: "center" }}>
                <div style={{ fontSize: 20, fontWeight: 800, color: "#d97706" }}>{customer.points}</div>
                <div style={{ fontSize: 11, color: "#6b7280", marginTop: 2 }}>可用积分</div>
              </div>
            </div>
            {customer.cards.length > 0 && (
              <div style={{ marginTop: 14 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: "#64748b", marginBottom: 8 }}>卡项</div>
                {customer.cards.map((card, i) => (
                  <div key={i} style={{
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    padding: "8px 12px", borderRadius: 8, background: "#f8fafc",
                    marginBottom: 6, fontSize: 12,
                  }}>
                    <span style={{ color: "#334155", fontWeight: 500 }}>{card.name}</span>
                    <span style={{ color: "#2563eb", fontWeight: 700 }}>剩余 {card.remain}/{card.total}</span>
                  </div>
                ))}
              </div>
            )}
            <div style={{
              display: "flex", justifyContent: "space-between", marginTop: 12,
              padding: "8px 12px", borderRadius: 8, background: "#f8fafc", fontSize: 12,
            }}>
              <span style={{ color: "#64748b" }}>优惠券</span>
              <span style={{ color: "#6d28d9", fontWeight: 700 }}>{customer.coupons} 张可用</span>
            </div>
            <button style={{
              width: "100%", marginTop: 14, padding: "9px", borderRadius: 8,
              border: "none", background: "#2563eb", color: "#fff", fontSize: 13,
              fontWeight: 600, cursor: "pointer", fontFamily: fontStack,
            }}>充值</button>
          </div>
        </div>

        {/* ─── Right Panel ─── */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {/* Pet Tabs */}
          <div style={{
            display: "flex", gap: 0, marginBottom: 16,
            background: "#fff", borderRadius: 12, overflow: "hidden",
            border: "1px solid #e9edf3",
          }}>
            {customer.pets.map((p, idx) => (
              <button key={p.id} onClick={() => { setActivePetIdx(idx); setActiveTab("medical"); }}
                style={{
                  flex: 1, padding: "14px 16px", border: "none", cursor: "pointer",
                  background: activePetIdx === idx ? "#2563eb" : "#fff",
                  color: activePetIdx === idx ? "#fff" : "#475569",
                  fontSize: 14, fontWeight: 600, fontFamily: fontStack,
                  borderRight: idx < customer.pets.length - 1 ? "1px solid #e9edf3" : "none",
                  transition: "all 0.15s",
                }}
              >{p.avatar} {p.name}（{p.breed}）</button>
            ))}
            <button onClick={() => setAddPetDrawerOpen(true)} style={{
              padding: "14px 20px", border: "none", cursor: "pointer",
              background: "#f8fafc", color: "#7c3aed", fontSize: 13,
              fontWeight: 600, fontFamily: fontStack,
              borderLeft: "1px solid #e9edf3",
            }}>+ 添加</button>
          </div>

          {/* Pet Status Panel */}
          <div style={{
            background: "#fff", borderRadius: 14, padding: 20,
            border: "1px solid #e9edf3", marginBottom: 16,
          }}>
            <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
              {/* Basic Info */}
              <div style={{ display: "flex", gap: 20, flex: 1 }}>
                <div style={{
                  width: 64, height: 64, borderRadius: 14, display: "flex",
                  alignItems: "center", justifyContent: "center", fontSize: 34,
                  background: pet.species === "猫" ? "#fdf4ff" : "#eff6ff",
                  border: `2px solid ${pet.species === "猫" ? "#f0abfc" : "#93c5fd"}`,
                  flexShrink: 0,
                }}>{pet.avatar}</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  <div style={{ fontSize: 16, fontWeight: 700, color: "#0f172a" }}>
                    {pet.name}
                    <span style={{ fontSize: 12, fontWeight: 400, color: "#94a3b8", marginLeft: 8 }}>
                      {pet.breed} · {pet.gender}{pet.neutered ? "-已绝育" : "-未绝育"} · {pet.weight}kg
                    </span>
                  </div>
                  <div style={{ fontSize: 12, color: "#64748b" }}>
                    <CalendarIcon /> 出生：{pet.birthday}（{pet.age}）
                  </div>
                  <div style={{ display: "flex", gap: 6 }}>
                    {pet.temperament.map(t => {
                      const s = TEMPERAMENT_STYLES[t] || TEMPERAMENT_STYLES["亲人"];
                      return <Badge key={t} bg={s.bg} text={s.text}>{t.includes("预警") ? "⚠️ " : ""}{t}</Badge>;
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Health Alerts */}
            <div style={{
              display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12,
              marginTop: 18,
            }}>
              <div style={{
                padding: "12px 14px", borderRadius: 10,
                background: pet.vaccineOverdue ? "#fef2f2" : "#f0fdf4",
                border: `1px solid ${pet.vaccineOverdue ? "#fecaca" : "#bbf7d0"}`,
              }}>
                <div style={{ fontSize: 11, color: "#6b7280", marginBottom: 4 }}>疫苗状态</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: pet.vaccineOverdue ? "#dc2626" : "#059669" }}>
                  {pet.vaccineOverdue ? "⚠ 已超期" : "✓ 正常"}
                </div>
                <div style={{ fontSize: 11, color: "#94a3b8", marginTop: 2 }}>
                  下次：{pet.nextVaccine}
                </div>
              </div>
              <div style={{
                padding: "12px 14px", borderRadius: 10,
                background: "#f0fdf4", border: "1px solid #bbf7d0",
              }}>
                <div style={{ fontSize: 11, color: "#6b7280", marginBottom: 4 }}>驱虫状态</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#059669" }}>✓ 正常</div>
                <div style={{ fontSize: 11, color: "#94a3b8", marginTop: 2 }}>
                  上次：{pet.lastDeworming}
                </div>
              </div>
              <div style={{
                padding: "12px 14px", borderRadius: 10,
                background: pet.allergies.length > 0 ? "#fef2f2" : "#f8fafc",
                border: `1px solid ${pet.allergies.length > 0 ? "#fecaca" : "#e2e8f0"}`,
              }}>
                <div style={{ fontSize: 11, color: "#6b7280", marginBottom: 4 }}>过敏史</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: pet.allergies.length > 0 ? "#dc2626" : "#94a3b8" }}>
                  {pet.allergies.length > 0 ? `⚠ ${pet.allergies.join("、")}` : "无记录"}
                </div>
              </div>
            </div>
          </div>

          {/* Business Record Tabs */}
          <div style={{
            background: "#fff", borderRadius: 14,
            border: "1px solid #e9edf3", overflow: "hidden",
          }}>
            <div style={{ display: "flex", borderBottom: "1px solid #e9edf3" }}>
              {[
                { key: "medical", label: "医疗病历" },
                { key: "groom", label: "洗护美容" },
                { key: "billing", label: "消费账单" },
              ].map(tab => (
                <button key={tab.key} onClick={() => setActiveTab(tab.key)}
                  style={{
                    padding: "13px 24px", border: "none", cursor: "pointer",
                    fontSize: 13, fontWeight: 600, fontFamily: fontStack,
                    background: "transparent",
                    color: activeTab === tab.key ? "#2563eb" : "#94a3b8",
                    borderBottom: activeTab === tab.key ? "2px solid #2563eb" : "2px solid transparent",
                    transition: "all 0.15s",
                  }}
                >{tab.label}</button>
              ))}
            </div>

            <div style={{ padding: 20 }}>
              {activeTab === "medical" && (
                pet.medicalRecords.length === 0 ? (
                  <div style={{ textAlign: "center", padding: 40, color: "#94a3b8", fontSize: 13 }}>暂无病历记录</div>
                ) : pet.medicalRecords.map((r, i) => (
                  <div key={i} style={{
                    padding: 16, borderRadius: 10, border: "1px solid #f1f5f9",
                    marginBottom: i < pet.medicalRecords.length - 1 ? 12 : 0,
                    background: "#fafbfc",
                  }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <span style={{ fontSize: 13, fontWeight: 700, color: "#0f172a" }}>{r.date}</span>
                        <Badge bg="#eff6ff" text="#1d4ed8" border="#bfdbfe">{r.doctor}</Badge>
                      </div>
                      {r.attachment && (
                        <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12, color: "#2563eb", cursor: "pointer" }}>
                          <FileIcon /> 查看化验单
                        </span>
                      )}
                    </div>
                    <div style={{ fontSize: 13, color: "#334155", marginBottom: 6 }}>
                      <span style={{ fontWeight: 600, color: "#64748b" }}>诊断：</span>{r.diagnosis}
                    </div>
                    <div style={{ fontSize: 12, color: "#64748b" }}>
                      <span style={{ fontWeight: 600 }}>处方：</span>{r.prescription}
                    </div>
                  </div>
                ))
              )}

              {activeTab === "groom" && (
                pet.groomRecords.length === 0 ? (
                  <div style={{ textAlign: "center", padding: 40, color: "#94a3b8", fontSize: 13 }}>暂无洗护记录</div>
                ) : pet.groomRecords.map((r, i) => (
                  <div key={i} style={{
                    padding: 16, borderRadius: 10, border: "1px solid #f1f5f9",
                    marginBottom: i < pet.groomRecords.length - 1 ? 12 : 0,
                    background: "#fafbfc",
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                      <span style={{ fontSize: 13, fontWeight: 700, color: "#0f172a" }}>{r.date}</span>
                      <Badge bg="#fdf4ff" text="#86198f" border="#f0abfc">{r.groomer}</Badge>
                    </div>
                    <div style={{ fontSize: 13, color: "#334155" }}>
                      <span style={{ fontWeight: 600, color: "#64748b" }}>项目：</span>{r.service}
                    </div>
                    <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
                      {r.hasBefore && <div style={{ padding: "6px 12px", borderRadius: 6, background: "#f1f5f9", fontSize: 12, color: "#475569" }}>📷 洗护前照片</div>}
                      {r.hasAfter && <div style={{ padding: "6px 12px", borderRadius: 6, background: "#f1f5f9", fontSize: 12, color: "#475569" }}>📷 洗护后照片</div>}
                    </div>
                  </div>
                ))
              )}

              {activeTab === "billing" && (
                pet.billingRecords.length === 0 ? (
                  <div style={{ textAlign: "center", padding: 40, color: "#94a3b8", fontSize: 13 }}>暂无消费记录</div>
                ) : (
                  <div>
                    {pet.billingRecords.map((r, i) => (
                      <div key={i} style={{
                        display: "flex", justifyContent: "space-between", alignItems: "center",
                        padding: "14px 16px", borderRadius: 10,
                        border: "1px solid #f1f5f9", background: "#fafbfc",
                        marginBottom: i < pet.billingRecords.length - 1 ? 8 : 0,
                      }}>
                        <div>
                          <div style={{ fontSize: 13, fontWeight: 600, color: "#0f172a" }}>{r.items}</div>
                          <div style={{ fontSize: 12, color: "#94a3b8", marginTop: 2 }}>{r.date}</div>
                        </div>
                        <div style={{ fontSize: 16, fontWeight: 800, color: r.amount > 0 ? "#0f172a" : "#94a3b8" }}>
                          {r.amount > 0 ? `¥${r.amount}` : "次卡抵扣"}
                        </div>
                      </div>
                    ))}
                    <div style={{
                      marginTop: 14, padding: "10px 16px", borderRadius: 8,
                      background: "#f8fafc", textAlign: "right", fontSize: 13,
                    }}>
                      累计消费：<span style={{ fontWeight: 800, color: "#0f172a", fontSize: 16 }}>
                        ¥{pet.billingRecords.reduce((s, r) => s + r.amount, 0).toLocaleString()}
                      </span>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
      <AddPetDrawer visible={addPetDrawerOpen} onClose={() => setAddPetDrawerOpen(false)} customerName={customer.name} />
    </div>
  );
}

// ─── AddPetDrawer (Detail Page) ───────
function AddPetDrawer({ visible, onClose, customerName }) {
  const [species, setSpecies] = useState("狗");
  if (!visible) return null;

  const labelStyle = { display: "block", fontSize: 12, fontWeight: 600, color: "#475569", marginBottom: 6 };
  const inputStyle = {
    width: "100%", padding: "9px 12px", borderRadius: 8, border: "1px solid #e2e8f0",
    fontSize: 13, fontFamily: fontStack, color: "#1e293b", outline: "none", boxSizing: "border-box",
  };

  const breedOptions = {
    "狗": ["金毛寻回犬", "拉布拉多", "泰迪犬", "柯基犬", "萨摩耶", "哈士奇", "边牧", "博美", "柴犬", "法斗"],
    "猫": ["布偶猫", "英短蓝猫", "美短虎斑", "橘猫", "暹罗猫", "加菲猫", "缅因猫", "无毛猫", "蓝白英短", "金渐层"],
    "其他": ["兔子", "仓鼠", "龙猫", "乌龟", "蜥蜴", "鹦鹉"],
  };

  return (
    <>
      <div onClick={onClose} style={{
        position: "fixed", inset: 0, background: "rgba(0,0,0,0.3)",
        zIndex: 998, backdropFilter: "blur(2px)",
      }} />
      <div style={{
        position: "fixed", right: 0, top: 0, bottom: 0, width: 480,
        background: "#fff", zIndex: 999, display: "flex", flexDirection: "column",
        boxShadow: "-8px 0 30px rgba(0,0,0,0.12)",
        animation: "slideIn 0.25s ease-out",
      }}>
        <style>{`@keyframes slideIn { from { transform: translateX(100%); } to { transform: translateX(0); } }`}</style>
        {/* Header */}
        <div style={{ padding: "20px 24px", borderBottom: "1px solid #f1f5f9" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <h3 style={{ margin: 0, fontSize: 17, fontWeight: 700, color: "#0f172a" }}>添加新宠物</h3>
            <button onClick={onClose} style={{
              background: "#f1f5f9", border: "none", borderRadius: 8, width: 32, height: 32,
              display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
            }}><XIcon /></button>
          </div>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 6, marginTop: 10,
            padding: "5px 12px", borderRadius: 6, background: "#eff6ff",
            fontSize: 12, color: "#1d4ed8", fontWeight: 500,
          }}>
            <span style={{ fontSize: 14 }}>👤</span> 所属客户：{customerName}
          </div>
        </div>

        {/* Body */}
        <div style={{ flex: 1, overflow: "auto", padding: 24 }}>
          {/* Avatar Upload */}
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
            <div style={{
              width: 80, height: 80, borderRadius: 16, display: "flex",
              flexDirection: "column", alignItems: "center", justifyContent: "center",
              border: "2px dashed #c4b5fd", background: "#faf5ff", cursor: "pointer",
            }}>
              <span style={{ fontSize: 28 }}>{species === "猫" ? "🐱" : species === "狗" ? "🐶" : "🐾"}</span>
              <span style={{ fontSize: 10, color: "#7c3aed", marginTop: 2, fontWeight: 600 }}>上传头像</span>
            </div>
            <div style={{ flex: 1, fontSize: 12, color: "#94a3b8", lineHeight: 1.6 }}>
              支持 JPG、PNG 格式<br />建议正面清晰照片，方便医生辨认
            </div>
          </div>

          {/* Form Fields */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px 16px" }}>
            <div>
              <label style={labelStyle}>宠物昵称 *</label>
              <input placeholder="请输入昵称" style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>宠物种类 *</label>
              <select value={species} onChange={e => setSpecies(e.target.value)} style={inputStyle}>
                <option>狗</option><option>猫</option><option>其他</option>
              </select>
            </div>
            <div style={{ gridColumn: "1 / -1" }}>
              <label style={labelStyle}>宠物品种 *</label>
              <input placeholder="支持下拉选择或拼音首字母检索，如 JM = 金毛" style={inputStyle} list="breed-list-add" />
              <datalist id="breed-list-add">
                {(breedOptions[species] || []).map(b => <option key={b} value={b} />)}
              </datalist>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 8 }}>
                {(breedOptions[species] || []).slice(0, 6).map(b => (
                  <span key={b} style={{
                    padding: "3px 10px", borderRadius: 999, fontSize: 11, fontWeight: 500,
                    background: "#f8fafc", border: "1px solid #e2e8f0", color: "#475569", cursor: "pointer",
                  }}>{b}</span>
                ))}
                {(breedOptions[species] || []).length > 6 && (
                  <span style={{ padding: "3px 10px", fontSize: 11, color: "#94a3b8" }}>+{breedOptions[species].length - 6} 更多...</span>
                )}
              </div>
            </div>
            <div>
              <label style={labelStyle}>生日</label>
              <input type="date" style={inputStyle} />
              <div style={{ fontSize: 11, color: "#94a3b8", marginTop: 4 }}>系统将自动计算年龄</div>
            </div>
            <div>
              <label style={labelStyle}>性别及绝育状态 *</label>
              <select style={inputStyle}>
                <option>公 - 未绝育</option><option>公 - 已绝育</option>
                <option>母 - 未绝育</option><option>母 - 已绝育</option>
              </select>
            </div>
            <div>
              <label style={labelStyle}>当前体重</label>
              <div style={{ position: "relative" }}>
                <input type="number" placeholder="0.0" step="0.1" style={{ ...inputStyle, paddingRight: 36 }} />
                <span style={{
                  position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)",
                  fontSize: 12, color: "#94a3b8", fontWeight: 600,
                }}>kg</span>
              </div>
            </div>
            <div>
              <label style={labelStyle}>毛色</label>
              <input placeholder="如：金色、黑白、蓝灰" style={inputStyle} />
            </div>
          </div>

          {/* Temperament Tags */}
          <div style={{ marginTop: 20 }}>
            <label style={labelStyle}>性格预警</label>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {[
                { label: "亲人", icon: "💚", color: "#166534", bg: "#dcfce7", borderColor: "#bbf7d0" },
                { label: "胆小", icon: "💛", color: "#854d0e", bg: "#fef9c3", borderColor: "#fde68a" },
                { label: "咬人预警", icon: "🔴", color: "#991b1b", bg: "#fee2e2", borderColor: "#fecaca" },
                { label: "抓人预警", icon: "🔴", color: "#991b1b", bg: "#fee2e2", borderColor: "#fecaca" },
              ].map(t => (
                <label key={t.label} style={{
                  display: "flex", alignItems: "center", gap: 6, padding: "7px 14px",
                  borderRadius: 999, border: `1.5px solid ${t.borderColor}`, fontSize: 12,
                  cursor: "pointer", background: "#fff", fontWeight: 500, color: t.color,
                }}>
                  <input type="checkbox" style={{ display: "none" }} />
                  <span>{t.icon}</span> {t.label}
                </label>
              ))}
            </div>
          </div>

          {/* Special Notes */}
          <div style={{ marginTop: 20 }}>
            <label style={labelStyle}>特殊备注</label>
            <textarea
              placeholder="记录宠物特殊情况，如已知过敏源、慢性疾病、行为习惯等..."
              rows={3}
              style={{ ...inputStyle, resize: "vertical" }}
            />
          </div>
        </div>

        {/* Footer */}
        <div style={{
          padding: "16px 24px", borderTop: "1px solid #f1f5f9",
          display: "flex", justifyContent: "space-between", alignItems: "center",
        }}>
          <div style={{ fontSize: 12, color: "#94a3b8" }}>带 * 为必填项</div>
          <div style={{ display: "flex", gap: 10 }}>
            <button onClick={onClose} style={{
              padding: "9px 20px", borderRadius: 8, border: "1px solid #e2e8f0",
              background: "#fff", fontSize: 13, fontWeight: 500, cursor: "pointer",
              fontFamily: fontStack, color: "#475569",
            }}>取消</button>
            <button style={{
              padding: "9px 24px", borderRadius: 8, border: "none",
              background: "#2563eb", color: "#fff", fontSize: 13, fontWeight: 600,
              cursor: "pointer", fontFamily: fontStack,
              boxShadow: "0 1px 3px rgba(37,99,235,0.3)",
            }}>保存宠物</button>
          </div>
        </div>
      </div>
    </>
  );
}

// ─── Main App ─────────────────────────
export default function App() {
  const [view, setView] = useState("list");
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div style={{
      fontFamily: fontStack,
      background: "#f4f6fa",
      minHeight: "100vh",
    }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=Noto+Sans+SC:wght@400;500;600;700;800&display=swap" rel="stylesheet" />

      {/* Top Nav */}
      <div style={{
        background: "#fff",
        borderBottom: "1px solid #e9edf3",
        padding: "0 32px",
        display: "flex", alignItems: "center", height: 56,
        position: "sticky", top: 0, zIndex: 100,
      }}>
        <div style={{ fontSize: 16, fontWeight: 800, color: "#0f172a", letterSpacing: "-0.02em" }}>
          <span style={{ color: "#2563eb" }}>Paw</span>Clinic
        </div>
        <div style={{ display: "flex", gap: 4, marginLeft: 40 }}>
          {["工作台", "预约排班", "客户宠物", "医疗管理", "洗护美容", "进销存", "收银", "营销"].map((item, i) => (
            <button key={item} style={{
              padding: "8px 16px", borderRadius: 8, border: "none",
              background: i === 2 ? "#eff6ff" : "transparent",
              color: i === 2 ? "#2563eb" : "#64748b",
              fontSize: 13, fontWeight: i === 2 ? 700 : 500,
              cursor: "pointer", fontFamily: fontStack,
            }}>{item}</button>
          ))}
        </div>
      </div>

      {/* Page Content */}
      <div style={{ padding: "24px 32px", maxWidth: 1280, margin: "0 auto" }}>
        {/* Breadcrumb */}
        <div style={{
          display: "flex", alignItems: "center", gap: 6,
          fontSize: 12, color: "#94a3b8", marginBottom: 18,
        }}>
          <span>工作台</span> <ChevronRight />
          <span style={{ color: view === "list" ? "#2563eb" : "#94a3b8", fontWeight: view === "list" ? 600 : 400 }}>客户与宠物管理</span>
          {view === "detail" && (
            <><ChevronRight /><span style={{ color: "#2563eb", fontWeight: 600 }}>{selectedCustomer?.name}</span></>
          )}
        </div>

        {view === "list" ? (
          <ListPage
            onViewDetail={(c) => { setSelectedCustomer(c); setView("detail"); }}
            onOpenCreate={() => setDrawerOpen(true)}
          />
        ) : (
          <DetailPage
            customer={selectedCustomer}
            onBack={() => setView("list")}
          />
        )}
      </div>

      <CreateDrawer visible={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </div>
  );
}
