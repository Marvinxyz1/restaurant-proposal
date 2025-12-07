import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import {
  Menu, X, ChevronDown, Check, Smartphone, Monitor, Tablet,
  Clock, MapPin, Phone, Instagram, ArrowRight, Shield, Zap,
  Layout, Search, Globe, Mail, CreditCard, Users, Server, BarChart
} from 'lucide-react';
import cofoScreenshot from './assets/cofo-screenshot.png';
import tokyoCinemaScreenshot from './assets/tokyo-cinema-screenshot.png';
import salesAiScreenshot from './assets/sales-ai-screenshot.jpg';

// --- Assets & Constants ---
const THEME = {
  bg: '#0a0b0a',
  text: '#efe7d2',
  accent: '#c4a574',
  accentDim: 'rgba(196, 165, 116, 0.2)',
  surface: '#141514',
  surfaceLight: '#1e201e',
};

// Font Injection
const FontStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Forum&family=Noto+Serif+JP:wght@300;400;500;700&display=swap');
    
    body {
      background-color: ${THEME.bg};
      color: ${THEME.text};
      font-family: 'Noto Serif JP', serif;
      overflow-x: hidden;
    }
    
    .font-eng {
      font-family: 'Forum', cursive;
    }

    .noise-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 9999;
      opacity: 0.05;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
    }

    /* Custom Scrollbar */
    ::-webkit-scrollbar {
      width: 8px;
    }
    ::-webkit-scrollbar-track {
      background: ${THEME.bg};
    }
    ::-webkit-scrollbar-thumb {
      background: #333;
      border-radius: 4px;
    }
    ::-webkit-scrollbar-thumb:hover {
      background: ${THEME.accent};
    }
  `}</style>
);

// --- Components ---

const SectionTitle = ({ en, jp }) => (
  <div className="mb-12 text-center">
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="font-eng text-4xl md:text-5xl text-[color:var(--accent)] mb-2 tracking-widest"
      style={{ color: THEME.accent }}
    >
      {en}
    </motion.h2>
    <motion.p 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.1 }}
      className="text-sm md:text-base tracking-widest opacity-80"
    >
      {jp}
    </motion.p>
    <div className="flex justify-center items-center mt-6 gap-2 opacity-50">
      <div className="h-[1px] w-12 bg-[color:var(--accent)]" style={{ backgroundColor: THEME.accent }}></div>
      <span className="text-[10px] text-[color:var(--accent)]" style={{ color: THEME.accent }}>◇</span>
      <div className="h-[1px] w-12 bg-[color:var(--accent)]" style={{ backgroundColor: THEME.accent }}></div>
    </div>
  </div>
);

const CountUp = ({ end, duration = 2 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    
    let startTime;
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / (duration * 1000), 1);
      
      setCount(Math.floor(end * percentage));
      
      if (progress < duration * 1000) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }, [end, duration, isInView]);

  return <span ref={ref}>{count.toLocaleString()}</span>;
};

// --- Sections ---

const Hero = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image Placeholder */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=2070&auto=format&fit=crop" 
          alt="Luxury Restaurant Background" 
          className="w-full h-full object-cover opacity-40 grayscale-[30%]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-[#0a0b0a]"></div>
      </div>

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-xl md:text-2xl mb-6 tracking-[0.2em] font-light">飲食店専門 ウェブサイト制作</h2>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight font-serif">
            お客様のお店の魅力を、<br />
            <span style={{ color: THEME.accent }} className="font-eng italic">最高の形</span>でお届けします
          </h1>
          <p className="text-sm md:text-base opacity-80 tracking-widest mb-12">
            和モダン・高級店に特化した、集客とブランディングを両立するWebデザイン
          </p>
          
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 border border-[#c4a574] text-[#c4a574] hover:bg-[#c4a574] hover:text-black transition-all duration-300 tracking-widest"
            onClick={() => document.getElementById('pricing').scrollIntoView({ behavior: 'smooth' })}
          >
            PLAN & PRICING
          </motion.button>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-center opacity-60"
      >
        <p className="text-xs mb-2 tracking-widest font-eng">SCROLL</p>
        <ChevronDown className="mx-auto" />
      </motion.div>
    </section>
  );
};

const Portfolio = () => {
  return (
    <section className="py-24 px-6 md:px-12 relative">
      <div className="max-w-6xl mx-auto">
        <SectionTitle en="Works" jp="制作実績" />
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* COFO Project */}
            <a
              href="https://cofo.jp/"
              target="_blank"
              rel="noopener noreferrer"
              className="block group"
            >
              <h3 className="text-2xl font-bold border-l-4 pl-4 group-hover:text-[#c4a574] transition-colors" style={{ borderColor: THEME.accent }}>
                COFO（コフォ）様
              </h3>
            </a>
            <p className="leading-relaxed opacity-80">
              理想の自分空間を創るリラクゼーションブランド「COFO」のECサイト制作に参画。
              レイアウト設計、プロダクト規画、モーション&アニメーション設計、日本語・英語のウェブデザイン全般を担当しました。
              高級家具ブランドにふさわしい洗練されたビジュアルと、ユーザー体験を重視したUI設計を実現。
            </p>
            <div className="flex flex-wrap gap-4 text-sm font-eng opacity-60">
              <span>#Layout Design</span>
              <span>#Product Planning</span>
              <span>#Motion Design</span>
              <span>#JP/EN Web Design</span>
            </div>

            {/* Tokyo Art Cinema Project */}
            <div className="mt-8 pt-8 border-t border-gray-800">
              <div className="block">
                <h3 className="text-2xl font-bold border-l-4 pl-4" style={{ borderColor: THEME.accent }}>
                  Tokyo Art Cinema
                </h3>
                <span className="ml-4 text-sm opacity-60 font-eng">Personal Project</span>
              </div>
              <p className="leading-relaxed opacity-80 mt-4">
                東京のミニシアター・アートハウス映画館の上映スケジュールを一括検索できるiOSアプリ。
                SwiftUI + MVVM アーキテクチャで開発。映画詳細情報、上映館検索、スケジュール管理機能を実装。
                美しいUIデザインと直感的なユーザー体験を重視した個人プロジェクトです。
              </p>
              <div className="flex flex-wrap gap-4 text-sm font-eng opacity-60 mt-4">
                <span>#SwiftUI</span>
                <span>#iOS App</span>
                <span>#MVVM</span>
                <span>#UI/UX Design</span>
              </div>
            </div>

            {/* Sales AI Assistant Project */}
            <div className="mt-8 pt-8 border-t border-gray-800">
              <div className="block">
                <h3 className="text-2xl font-bold border-l-4 pl-4" style={{ borderColor: THEME.accent }}>
                  営業支援AIアシスタント
                </h3>
                <span className="ml-4 text-sm opacity-60 font-eng">Corporate Project（実画面非公開）</span>
              </div>
              <p className="leading-relaxed opacity-80 mt-4">
                営業担当者の商談をリアルタイムでサポートするAIアシスタント。
                顧客との会話を自動で音声認識し、重要情報をカード形式で抽出・整理。
                会議記録の自動生成、リアルタイムの提案サジェスト機能により、成約率向上を支援。
              </p>
              <div className="flex flex-wrap gap-4 text-sm font-eng opacity-60 mt-4">
                <span>#Speech Recognition</span>
                <span>#AI/LLM</span>
                <span>#Real-time Processing</span>
                <span>#Sales Enablement</span>
              </div>
            </div>
          </motion.div>

          {/* Device Mockups */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative h-[400px] w-full"
          >
            {/* PC Mockup */}
            <div className="absolute top-0 right-0 w-3/4 h-64 bg-[#1a1a1a] rounded-lg border border-gray-700 shadow-2xl z-10 overflow-hidden">
               <div className="h-4 bg-gray-800 flex items-center px-2 gap-1">
                 <div className="w-2 h-2 rounded-full bg-red-500"></div>
                 <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                 <div className="w-2 h-2 rounded-full bg-green-500"></div>
               </div>
               <img
                 src={cofoScreenshot}
                 alt="COFO Website Screenshot"
                 className="w-full h-[calc(100%-16px)] object-cover object-top"
               />
            </div>
            
            {/* Tablet Mockup */}
            <div className="absolute bottom-10 left-10 w-1/2 h-64 bg-[#1a1a1a] rounded-lg border border-gray-700 shadow-2xl z-20 overflow-hidden transform -rotate-2">
               <img
                 src={salesAiScreenshot}
                 alt="Sales AI Assistant Screenshot"
                 className="w-full h-full object-cover"
               />
            </div>

            {/* Mobile Mockup */}
            <div className="absolute bottom-0 right-20 w-24 h-48 bg-[#1a1a1a] rounded-2xl border-4 border-gray-800 shadow-2xl z-30 overflow-hidden">
              <img
                src={tokyoCinemaScreenshot}
                alt="Tokyo Art Cinema App Screenshot"
                className="w-full h-full object-cover object-top"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const PricingPackage = () => {
  const items = [
    { name: "トップページ", desc: "動画背景ヒーロー、カード型ナビゲーション、SNSリンク、アニメーション効果", price: 80000 },
    { name: "メニューページ", desc: "カテゴリ別メニュー表示（3カテゴリ12品目）、価格表示、画像ギャラリー", price: 50000 },
    { name: "ご予約ページ", desc: "予約フォーム7項目、入力バリデーション、店舗情報表示", price: 70000 },
    { name: "私たちについて", desc: "店舗紹介、こだわり説明（素材・技術）、画像付きセクション", price: 45000 },
    { name: "お問い合わせ", desc: "Googleマップ埋め込み、営業時間表、連絡先情報、SNSリンク", price: 45000 },
    { name: "レスポンシブ対応", desc: "PC・タブレット・スマートフォン完全対応、ハンバーガーメニュー", price: 40000 },
    { name: "日本語ローカライズ", desc: "全ページ日本語対応、Noto Serif JP フォント適用", price: 30000 },
    { name: "基本SEO対策", desc: "メタタグ設定、OGP設定、ページタイトル最適化", price: 20000 },
  ];

  return (
    <section id="pricing" className="py-24 px-6 bg-[color:var(--surface)]" style={{ backgroundColor: THEME.surface }}>
      <div className="max-w-5xl mx-auto">
        <SectionTitle en="Basic Package" jp="基本パッケージ" />
        
        <div className="text-center mb-16">
          <p className="text-lg opacity-80 mb-2">Webサイト構築一式</p>
          <div className="text-5xl md:text-7xl font-bold font-eng flex justify-center items-baseline gap-2">
            <span className="text-2xl md:text-3xl">¥</span>
            <span style={{ color: THEME.accent }}>380,000</span>
          </div>
          <p className="text-sm opacity-50 mt-2">（税別）</p>
        </div>

        <div className="bg-[#0f0f0f] border border-gray-800 rounded-lg overflow-hidden shadow-2xl">
          {items.map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              viewport={{ once: true }}
              className="grid md:grid-cols-12 gap-4 p-6 border-b border-gray-800 hover:bg-white/5 transition-colors items-center"
            >
              <div className="md:col-span-3 font-bold text-[color:var(--accent)]" style={{ color: THEME.accent }}>{item.name}</div>
              <div className="md:col-span-7 text-sm opacity-80">{item.desc}</div>
              <div className="md:col-span-2 text-right font-eng opacity-90">¥{item.price.toLocaleString()}</div>
            </motion.div>
          ))}
          <div className="p-6 bg-[#1a1a1a] text-center md:text-right">
            <span className="mr-4 text-sm opacity-60">合計（税別）</span>
            <span className="text-2xl font-bold font-eng" style={{ color: THEME.accent }}>¥380,000</span>
          </div>
        </div>
      </div>
    </section>
  );
};

const Features = () => {
  const features = [
    "オリジナルデザイン（テンプレート不使用）", "全5ページ制作", "レスポンシブ対応（全デバイス最適化）",
    "高速表示（Next.js 最新技術使用）", "予約フォーム実装", "Googleマップ連携",
    "SNSリンク設置", "基本SEO対策", "画像最適化処理",
    "アニメーション効果", "1回の修正対応込み", "納品後1ヶ月の無料サポート", "ソースコード納品"
  ];

  return (
    <section className="py-20 px-6 border-b border-gray-900">
      <div className="max-w-4xl mx-auto">
        <h3 className="text-center text-xl mb-12 font-bold">パッケージに含まれるもの</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-4 gap-x-8">
          {features.map((f, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              viewport={{ once: true }}
              className="flex items-center gap-3"
            >
              <div className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center bg-[color:var(--accentDim)]" style={{ backgroundColor: THEME.accentDim }}>
                <Check size={12} color={THEME.accent} />
              </div>
              <span className="text-sm">{f}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const OptionCard = ({ title, icon: Icon, items }) => (
  <div className="bg-[#141414] border border-gray-800 rounded-lg p-6 hover:translate-y-[-4px] transition-transform duration-300 hover:shadow-lg hover:shadow-[rgba(196,165,116,0.1)]">
    <div className="flex items-center gap-3 mb-6 border-b border-gray-800 pb-4">
      <Icon size={24} color={THEME.accent} />
      <h4 className="text-lg font-bold">{title}</h4>
    </div>
    <div className="space-y-4">
      {items.map((item, idx) => (
        <div key={idx} className="flex justify-between items-start text-sm group">
          <div className="flex-1 pr-4">
            <p className="font-bold text-gray-300 group-hover:text-[color:var(--accent)] transition-colors" style={{ '--accent': THEME.accent }}>{item.name}</p>
            <p className="text-xs text-gray-500 mt-1">{item.desc}</p>
          </div>
          <div className="text-right whitespace-nowrap font-eng text-gray-400">
            {item.price}
          </div>
        </div>
      ))}
    </div>
  </div>
);

const Options = () => {
  const optionsData = [
    {
      title: "予約・決済・LINE",
      icon: CreditCard,
      items: [
        { name: "オンライン予約システム", desc: "リアルタイム空席確認、カレンダー連携、自動メール", price: "¥150,000〜" },
        { name: "オンライン決済連携", desc: "クレカ、事前決済、PayPay対応", price: "¥120,000〜" },
        { name: "LINE予約連携", desc: "LINE公式アカウント連携、自動返信", price: "¥60,000〜" },
      ]
    },
    {
      title: "集客・マーケティング",
      icon: Globe,
      items: [
        { name: "多言語対応（英語）", desc: "外国人観光客向け、言語切替機能", price: "¥80,000〜" },
        { name: "Instagram自動連携", desc: "投稿自動取得、ギャラリー自動更新", price: "¥40,000〜" },
        { name: "Googleビジネス連携", desc: "口コミ表示、営業情報同期", price: "¥35,000〜" },
      ]
    },
    {
      title: "コンテンツ管理",
      icon: Layout,
      items: [
        { name: "ブログ/お知らせCMS", desc: "記事投稿・編集・削除機能", price: "¥100,000〜" },
        { name: "メニュー管理システム", desc: "管理画面からメニュー価格変更", price: "¥80,000〜" },
        { name: "画像管理システム", desc: "画像アップロード・ギャラリー管理", price: "¥50,000〜" },
      ]
    },
    {
      title: "EC・会員機能",
      icon: Users,
      items: [
        { name: "お取り寄せEC機能", desc: "商品販売、カート、在庫、配送設定", price: "¥200,000〜" },
        { name: "会員・ポイント機能", desc: "会員登録、来店ポイント管理", price: "¥180,000〜" },
        { name: "メールマガジン", desc: "会員向け配信、キャンペーン通知", price: "¥60,000〜" },
      ]
    },
    {
      title: "インフラ・保守",
      icon: Server,
      items: [
        { name: "サーバー構築", desc: "Vercel/AWS等への設置", price: "¥30,000" },
        { name: "SSL証明書設定", desc: "HTTPS化、セキュリティ対応", price: "¥15,000" },
        { name: "アクセス解析設置", desc: "GA4設定、初期レポート", price: "¥30,000" },
      ]
    }
  ];

  return (
    <section className="py-24 px-6 bg-[#0e0e0e]">
      <div className="max-w-6xl mx-auto">
        <SectionTitle en="Options" jp="追加オプション機能" />
        <p className="text-center mb-12 opacity-70">今後のサイト拡張にも柔軟に対応いたします</p>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {optionsData.map((opt, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <OptionCard {...opt} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Maintenance = () => {
  return (
    <section className="py-24 px-6 relative">
      <div className="max-w-5xl mx-auto">
        <SectionTitle en="Support" jp="保守・運用プラン" />

        <div className="grid md:grid-cols-3 gap-8">
          {/* Light */}
          <div className="bg-[#141414] p-8 rounded-lg border border-gray-800 opacity-80 hover:opacity-100 transition-opacity">
            <h4 className="text-xl font-bold mb-2 text-center">Light</h4>
            <div className="text-center text-3xl font-eng mb-6">¥10,000<span className="text-xs">/月</span></div>
            <ul className="space-y-3 text-sm opacity-70 mb-8">
              <li className="flex gap-2"><Check size={16} /> 軽微なテキスト修正(月2回)</li>
              <li className="flex gap-2"><Check size={16} /> セキュリティ監視</li>
              <li className="flex gap-2"><Check size={16} /> 障害時対応</li>
              <li className="flex gap-2"><Check size={16} /> メールサポート</li>
            </ul>
          </div>

          {/* Standard */}
          <motion.div 
            whileHover={{ y: -10 }}
            className="bg-[#1e1e1e] p-8 rounded-lg border-2 relative transform md:-translate-y-4"
            style={{ borderColor: THEME.accent }}
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[color:var(--accent)] text-black text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider" style={{ backgroundColor: THEME.accent }}>
              Recommended
            </div>
            <h4 className="text-xl font-bold mb-2 text-center" style={{ color: THEME.accent }}>Standard</h4>
            <div className="text-center text-4xl font-eng mb-6 font-bold">¥25,000<span className="text-xs font-normal opacity-70">/月</span></div>
            <ul className="space-y-4 text-sm mb-8">
              <li className="flex gap-2"><Check size={16} color={THEME.accent} /> テキスト・画像修正無制限</li>
              <li className="flex gap-2"><Check size={16} color={THEME.accent} /> コンテンツ更新代行</li>
              <li className="flex gap-2"><Check size={16} color={THEME.accent} /> 定期バックアップ</li>
              <li className="flex gap-2"><Check size={16} color={THEME.accent} /> 電話サポート・月次MTG</li>
            </ul>
          </motion.div>

          {/* Premium */}
          <div className="bg-[#141414] p-8 rounded-lg border border-gray-800 opacity-80 hover:opacity-100 transition-opacity">
            <h4 className="text-xl font-bold mb-2 text-center">Premium</h4>
            <div className="text-center text-3xl font-eng mb-6">¥50,000<span className="text-xs">/月</span></div>
            <ul className="space-y-3 text-sm opacity-70 mb-8">
              <li className="flex gap-2"><Check size={16} /> 全ての内容を含む</li>
              <li className="flex gap-2"><Check size={16} /> 機能追加・改善提案</li>
              <li className="flex gap-2"><Check size={16} /> 優先対応（24h以内）</li>
              <li className="flex gap-2"><Check size={16} /> SEO改善提案レポート</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

const Workflow = () => {
  const steps = [
    { title: "ヒアリング", time: "1-2日", desc: "コンセプト・ご要望・素材の確認" },
    { title: "デザイン案作成", time: "3-5日", desc: "ワイヤー・カンプ・2案ご提示" },
    { title: "ご確認・修正", time: "2-3日", desc: "フィードバック反映・デザイン確定" },
    { title: "開発・実装", time: "5-7日", desc: "コーディング・機能実装" },
    { title: "テスト・調整", time: "2-3日", desc: "動作確認・スマホ実機テスト" },
    { title: "納品・公開", time: "1日", desc: "本番公開・操作説明・お引き渡し" },
  ];

  return (
    <section className="py-24 px-6 bg-[color:var(--surface)]" style={{ backgroundColor: THEME.surface }}>
      <div className="max-w-4xl mx-auto">
        <SectionTitle en="Workflow" jp="制作の流れ" />
        
        <div className="relative border-l-2 border-gray-800 ml-4 md:ml-12 space-y-12">
          {steps.map((step, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative pl-8 md:pl-12"
            >
              <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full border-2 bg-[#0a0b0a]" style={{ borderColor: THEME.accent }}></div>
              <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-4 mb-2">
                <span className="font-eng text-[color:var(--accent)] font-bold text-lg" style={{ color: THEME.accent }}>STEP {i + 1}</span>
                <h4 className="text-xl font-bold">{step.title}</h4>
                <span className="text-sm px-2 py-0.5 bg-gray-800 rounded text-gray-400">{step.time}</span>
              </div>
              <p className="text-sm opacity-60">{step.desc}</p>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <p className="text-lg border-2 inline-block px-8 py-4 border-[color:var(--accent)] text-[color:var(--accent)] font-bold" style={{ borderColor: THEME.accent, color: THEME.accent }}>
            標準納期：約2〜3週間
          </p>
        </div>
      </div>
    </section>
  );
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const qas = [
    { q: "写真は自分で用意する必要がありますか？", a: "お店の写真をご提供いただければ最適ですが、別途費用にてプロカメラマンの手配も可能です。素材がない場合はイメージに合うフリー素材で対応も可能です。" },
    { q: "公開後の修正は可能ですか？", a: "納品後1ヶ月は無料で軽微な修正に対応いたします。それ以降は保守プランへのご加入、または都度お見積りとなります。" },
    { q: "スマートフォンでも綺麗に見えますか？", a: "はい、PC・タブレット・スマートフォンの全デバイスで最適に表示される完全レスポンシブデザインを採用しております。" },
    { q: "制作期間はどのくらいですか？", a: "通常2〜3週間で納品可能です。お急ぎの場合は特急料金にて優先対応をご相談いただけます。" },
    { q: "自分で更新できますか？", a: "基本パッケージはコードベースのため技術知識が必要です。ブログやお知らせなどをご自身で更新されたい場合は、CMS機能（オプション）の導入をお勧めしております。" },
  ];

  return (
    <section className="py-24 px-6 bg-[#0e0e0e]">
      <div className="max-w-3xl mx-auto">
        <SectionTitle en="Q & A" jp="よくあるご質問" />
        
        <div className="space-y-4">
          {qas.map((qa, i) => (
            <div key={i} className="border border-gray-800 rounded-lg overflow-hidden bg-[#141414]">
              <button 
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full text-left p-6 flex justify-between items-center hover:bg-white/5 transition-colors"
              >
                <span className="font-bold pr-4">Q. {qa.q}</span>
                <ChevronDown className={`transition-transform duration-300 ${openIndex === i ? 'rotate-180' : ''}`} size={20} />
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="p-6 pt-0 text-sm opacity-70 leading-relaxed border-t border-gray-800/50">
                      <span className="font-bold text-[color:var(--accent)] mr-2" style={{ color: THEME.accent }}>A.</span>
                      {qa.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const TechStack = () => (
  <section className="py-16 border-t border-gray-900 bg-black text-center">
    <div className="max-w-4xl mx-auto px-6">
      <h3 className="text-sm font-eng tracking-widest opacity-50 mb-8">TECHNOLOGY STACK</h3>
      <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
        <div className="flex flex-col items-center gap-2">
          <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center font-bold">N</div>
          <span className="text-xs">Next.js 16</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center font-bold text-blue-400">R</div>
          <span className="text-xs">React 19</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center font-bold text-blue-600">TS</div>
          <span className="text-xs">TypeScript</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center font-bold text-cyan-400">Tw</div>
          <span className="text-xs">Tailwind 4</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center font-bold">▲</div>
          <span className="text-xs">Vercel</span>
        </div>
      </div>
      <p className="mt-8 text-xs opacity-40">最新の技術スタックで、高速・安全・拡張性の高いサイトを構築します。</p>
    </div>
  </section>
);

const Roadmap = () => (
  <div className="bg-[#111] p-8 md:p-12 text-center border-t border-gray-900">
     <h4 className="font-bold mb-6 text-lg">開発ロードマップ（将来的な拡張）</h4>
     <div className="flex flex-col md:flex-row justify-center gap-8 text-sm text-gray-500">
        <div className="border border-gray-800 p-4 rounded bg-black">
          <span className="block text-[color:var(--accent)] font-bold mb-2" style={{ color: THEME.accent }}>Phase 2</span>
          <ul className="list-disc list-inside text-left space-y-1">
            <li>オンライン予約システム</li>
            <li>多言語対応</li>
            <li>LINE通知連携</li>
          </ul>
        </div>
        <div className="flex items-center justify-center rotate-90 md:rotate-0"><ArrowRight size={20}/></div>
        <div className="border border-gray-800 p-4 rounded bg-black">
          <span className="block text-[color:var(--accent)] font-bold mb-2" style={{ color: THEME.accent }}>Phase 3</span>
          <ul className="list-disc list-inside text-left space-y-1">
            <li>お取り寄せEC機能</li>
            <li>会員・ポイントシステム</li>
            <li>オンライン決済</li>
          </ul>
        </div>
     </div>
  </div>
);

const CTA = () => {
  return (
    <section className="py-24 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-[#c4a574] to-[#8f754a] opacity-10"></div>
      <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
        <span className="text-[20vw] font-eng font-bold text-white">CONTACT</span>
      </div>
      
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <h2 className="text-3xl md:text-5xl font-bold mb-6 font-serif">まずは無料でご相談ください</h2>
        <p className="text-lg opacity-80 mb-12">お店のコンセプトやご予算に合わせて、<br className="md:hidden" />最適なプランをご提案いたします。</p>
        
        <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full md:w-auto px-12 py-5 bg-[color:var(--accent)] text-black font-bold text-lg shadow-[0_0_20px_rgba(196,165,116,0.3)] hover:shadow-[0_0_30px_rgba(196,165,116,0.5)] transition-all rounded-sm flex items-center justify-center gap-2"
            style={{ backgroundColor: THEME.accent }}
          >
            無料相談を予約する <ArrowRight size={20} />
          </motion.button>
          
          <motion.button 
            whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.1)' }}
            whileTap={{ scale: 0.95 }}
            className="w-full md:w-auto px-10 py-5 border border-white/30 text-white font-medium hover:border-white transition-all rounded-sm flex items-center justify-center gap-2"
          >
            資料をダウンロード
          </motion.button>
        </div>
        
        <div className="mt-12 flex justify-center items-center gap-2 text-xl font-eng">
          <Phone size={20} color={THEME.accent} />
          <span>080-5636-6999</span>
        </div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="bg-black py-12 px-6 border-t border-gray-900 text-sm opacity-60">
    <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
      <div className="font-eng text-xl font-bold tracking-widest text-white">WEB DESIGN SERVICE</div>
      <div className="flex gap-8">
        <a href="#" className="hover:text-white transition-colors">Service</a>
        <a href="#" className="hover:text-white transition-colors">Pricing</a>
        <a href="#" className="hover:text-white transition-colors">Works</a>
        <a href="#" className="hover:text-white transition-colors">Contact</a>
      </div>
      <div className="flex gap-4">
         <Instagram size={20} className="hover:text-white cursor-pointer" />
         <Mail size={20} className="hover:text-white cursor-pointer" />
      </div>
    </div>
    <div className="text-center mt-12 text-xs font-eng">
      © 2024 Web Design Service. All Rights Reserved.
    </div>
  </footer>
);

// --- Main App Component ---

const App = () => {
  return (
    <div className="min-h-screen bg-[#0a0b0a] text-[#efe7d2] selection:bg-[#c4a574] selection:text-black">
      <FontStyles />
      <div className="noise-overlay"></div>
      
      {/* Fixed Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-[#0a0b0a]/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="font-eng font-bold text-lg tracking-widest">DESIGN PARTNER</div>
          <div className="hidden md:flex gap-8 text-sm font-eng tracking-widest opacity-80">
            <a href="#works" className="hover:text-[color:var(--accent)] transition-colors" style={{ '--accent': THEME.accent }}>WORKS</a>
            <a href="#pricing" className="hover:text-[color:var(--accent)] transition-colors" style={{ '--accent': THEME.accent }}>PRICING</a>
            <a href="#flow" className="hover:text-[color:var(--accent)] transition-colors" style={{ '--accent': THEME.accent }}>FLOW</a>
          </div>
          <button className="md:hidden">
            <Menu color={THEME.accent} />
          </button>
        </div>
      </nav>

      <main>
        <Hero />
        <Portfolio />
        <PricingPackage />
        <Features />
        <Options />
        <Maintenance />
        <div id="flow">
            <Workflow />
        </div>
        <TechStack />
        <Roadmap />
        <FAQ />
        <CTA />
      </main>

      <Footer />
    </div>
  );
};

export default App;