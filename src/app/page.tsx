"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  FileText,
  Globe2,
  Languages,
  Mail,
  Megaphone,
  MessageSquare,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";

const CONTACT_EMAIL = "info@peripheralnation.jp";
const FORMSPREE_ENDPOINT =
  process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT || "";

// 機能コピーを“何が不要になるか”ベースに調整
const features = [
  {
    icon: Megaphone,
    title: "お知らせ一括配信",
    text: "入居者への連絡を、まとめて一度で。掲示板や紙の配布は、もう必要ありません。",
  },
  {
    icon: FileText,
    title: "ルール・取説PDF",
    text: "ゴミ出しや設備のルールをアプリに固定表示。何度も同じ説明をする手間はなくなります。",
  },
  {
    icon: MessageSquare,
    title: "問い合わせ・修繕",
    text: "問い合わせはアプリから。電話に出られない時間でも、対応状況が分かります。",
  },
  {
    icon: Languages,
    title: "多言語対応",
    text: "英語・中国語から対応。外国人入居者にも伝わる連絡体制を。",
  },
];

const tiers = [
  {
    name: "Free",
    price: "¥0",
    detail: "β期間：無料（まずは1物件から）",
    bullets: ["お知らせ配信", "ルール・取説掲載（PDF 1件）", "メールサポート"],
  },
  {
    name: "Basic",
    price: "¥980",
    detail: "正式版予定：小規模オーナーの標準",
    bullets: ["PDF無制限", "一括配信", "ブランドバナー（小さめ）"],
  },
  {
    name: "Pro",
    price: "¥4,980",
    detail: "正式版予定：多言語・運用強化",
    bullets: ["多言語UI", "チャット管理", "入居者対応の状況把握"],
  },
];


const faqs = [
  {
    q: "本当に1〜50戸向けなんですか？",
    a: "はい。ResiPortは小規模物件での入居者対応に特化しています。大規模向けの複雑な機能はあえて入れていません。",
  },
  {
    q: "入居者はアプリのインストールが必要ですか？",
    a: "いいえ。QRコードのワンショットで利用可能です（スマホ・タブレット・PC対応）。",
  },
  {
    q: "β期間は本当に無料ですか？",
    a: "はい。β期間中は基本機能を無料でお試しいただけます。クレジットカードの登録も不要です。",
  },
  {
    q: "β期間が終わったら自動で課金されますか？",
    a: "いいえ。β期間終了後に、改めて正式プランをご案内します。ご納得いただいた方のみ継続してご利用ください。",
  },
    {
    q: "個人オーナーでも使えますか？",
    a: "もちろんです。1棟だけ、数戸だけでも問題ありません。むしろ、そうしたオーナーさま向けに設計しています。",
  },
  {
    q: "多言語はどこまで対応しますか？",
    a: "まずは英語・中国語から。現場で要望が多い言語を優先して拡大します。",
  },
  {
    q: "収支管理や利回り計算はどこまでできますか？",
    a: "β版では、物件ごとの収支メモや簡易的な利回り確認が可能です。本格的な収支管理機能は、β利用者の声をもとに検討します。",
  },
  {
    q: "導入費用が非常に安価なのはなぜですか？",
    a: "戸数規模を限定した最適設計で実現しています。",
  },
];



export default function ResiPortLanding() {
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formEl = e.currentTarget;
    const form = new FormData(formEl);

    if (!form.get("email") || !form.get("name")) {
      toast.error("お名前とメールアドレスを入力してください。");
      return;
    }

    // ハニーポット（bot対策）
    if ((form.get("company") as string | null)?.length) {
      toast.success("送信しました。");
      formEl.reset();
      return;
    }

    if (!FORMSPREE_ENDPOINT) {
      toast.error("送信先が未設定です（NEXT_PUBLIC_FORMSPREE_ENDPOINT）。");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: form,
      });

      if (!res.ok) {
        let msg = `HTTP ${res.status}`;
        try {
          const data = await res.json();
          if (data?.errors?.[0]?.message) {
            msg = data.errors[0].message;
          }
        } catch {
          // ignore
        }
        console.error("Formspree error:", msg);
        toast.error(`送信に失敗しました: ${msg}`);
        return;
      }

      toast.success("βテスター登録を受け付けました！");
      formEl.reset();
    } catch (err) {
      console.error(err);
      toast.error("送信に失敗しました。時間をおいて再度お試しください。");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Toaster richColors />

      {/* ヘッダー（白背景＋オレンジアクセント） */}
      <header className="sticky top-0 z-30 bg-white/90 backdrop-blur border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image
              src="/resiport-logo.png"
              alt="ResiPort logo"
              width={42}
              height={42}
              className="rounded-xl shadow-[0_0_20px_rgba(251,146,60,0.5)]"
            />
            <div className="leading-tight">
              <div className="font-semibold tracking-wide text-slate-900">
                ResiPort
              </div>
              <div className="text-[11px] text-slate-500">
                by Peripheral Nation
              </div>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-4 text-sm text-slate-600">
            <a className="hover:text-slate-900" href="#features">
              機能
            </a>
            <a className="hover:text-slate-900" href="#pricing">
              料金
            </a>
            <a className="hover:text-slate-900" href="#apply">
              β参加
            </a>
            <a className="hover:text-slate-900" href="#faq">
              FAQ
            </a>
          </div>
          <Button
            asChild
            size="sm"
            className="rounded-2xl bg-orange-500 hover:bg-orange-600 text-white"
          >
            <a href="#apply">βテスト参加</a>
          </Button>
        </div>
      </header>

      {/* ヒーロー：白背景＋オレンジ＆水色 */}
      <section className="relative overflow-hidden border-b border-slate-100 bg-white">
        {/* 抽象背景レイヤー */}
        <div className="pointer-events-none absolute inset-0">
          {/* オレンジのにじみ */}
          <div className="absolute -top-32 -left-32 h-[420px] w-[420px] rounded-full bg-orange-200/30 blur-3xl" />
          {/* 水色のにじみ */}
          <div className="absolute top-40 -right-32 h-[380px] w-[380px] rounded-full bg-sky-200/30 blur-3xl" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 pt-14 pb-12">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <Badge className="mb-4 bg-orange-50 text-orange-700 border-orange-200">
                βテスター募集
              </Badge>

              {/* 感情の入口フレーズ（小さめ） */}
              <p className="text-sm text-slate-500 mb-2">
                オーナーはもう、管理で頑張らなくていい。
              </p>

              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900"
              >
                入居者対応、今日からアプリで。
              </motion.h1>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-amber-400 to-sky-500">
                大規模向けは要らない。1〜50戸のための、ちょうどいい管理アプリ。
              </span>

              

              <p className="mt-5 text-slate-600 leading-relaxed">
                ResiPort は、1〜50戸クラスのオーナー・管理者向けに作った
                入居者対応に特化した管理アプリです。
                お知らせ配信、ゴミ出しルール、取扱説明書、問い合わせ対応まで。
                管理で頑張らなくていい状態を、今日から作れます。
                <br /><br />
                β版では、物件ごとの簡易的な収支メモや利回り確認も一部試験導入します。
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Button
                  asChild
                  className="rounded-2xl bg-orange-500 hover:bg-orange-600 text-white"
                >
                  <a href="#apply">無料でβ参加する</a>
                </Button>
                <Button
                  variant="outline"
                  asChild
                  className="rounded-2xl border-sky-300 text-sky-700 hover:bg-sky-50"
                >
                  <a href={`mailto:${CONTACT_EMAIL}`}>まずは相談したい</a>
                </Button>
              </div>
              {/* CTA下の不安つぶし */}
              <p className="text-xs text-slate-500 mt-2">
                ※ クレジットカード登録なし。お気軽にご参加ください。
              </p>

              <div className="mt-4 flex flex-wrap gap-3 text-xs text-slate-500">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="h-4 w-4 text-emerald-500" />
                  β期間のドメイン・サーバ費は当社負担
                </div>
                <div className="flex items-center gap-1.5">
                  <Globe2 className="h-4 w-4 text-sky-500" />
                  スマホ・タブレット・PC対応
                </div>
              </div>
            </div>

            {/* 簡易ダッシュボードモック */}
            <div className="hidden md:block">
              <Card className="bg-white border-slate-200 shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-sm text-slate-800">
                    <Building2 className="h-4 w-4 text-orange-500" />
                    ResiPort ダッシュボード（イメージ）
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-xs text-slate-700">
                  <div className="flex justify-between items-center">
                    <span>入居者数</span>
                    <span className="font-semibold text-slate-900">24</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>本日の未読お知らせ</span>
                    <span className="font-semibold text-orange-500">3</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>対応中の問い合わせ</span>
                    <span className="font-semibold text-sky-500">2</span>
                  </div>
                  <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent my-2" />
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-orange-400" />
                      <span>ゴミ出しルール：アプリに固定表示</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-slate-500" />
                      <span>設備取説PDF：各部屋ごとに紐づけ</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-sky-500" />
                      <span>通知配信履歴：物件別に一覧</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* 機能セクション */}
      <section id="features" className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-semibold text-slate-900">
            小さな物件に、本当に必要な機能だけ。
          </h2>
          <p className="text-slate-600 mt-3">
            ResiPort は、現場で本当に使われる最小構成から始めます。
          </p>
        </div>
        <div className="grid md:grid-cols-4 gap-4">
          {features.map((f, i) => (
            <Card
              key={i}
              className="bg-white border border-slate-200 shadow-sm"
            >
              <CardContent className="p-5">
                <f.icon
                  className={`h-6 w-6 mb-3 ${
                    i === 0
                      ? "text-orange-500"
                      : i === 1
                      ? "text-slate-500"
                      : i === 2
                      ? "text-sky-500"
                      : "text-emerald-500"
                  }`}
                />
                <div className="font-medium mb-1 text-slate-900">
                  {f.title}
                </div>
                <div className="text-sm text-slate-600">{f.text}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* 料金プラン */}
      <section
        id="pricing"
        className="border-y border-slate-100 bg-slate-50/70"
      >
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-semibold text-slate-900">
              料金プラン（β期間は無料）
            </h2>
            <p className="text-slate-600 mt-3">
              まずは無料で使って、手応えがあれば続ける。それでOKです。
            </p>
            <p className="text-slate-500 mt-1 text-xs">
              ※ 下記は正式リリース時の予定価格です（内容はβ利用者の声で調整します）。
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {tiers.map((t, i) => (
              <Card
                key={i}
                className={`relative overflow-hidden border ${
                  t.name === "Basic"
                    ? "border-orange-300 bg-white shadow-md"
                    : "border-slate-200 bg-white"
                }`}
              >
                {t.name === "Basic" && (
                  <div className="absolute inset-x-0 -top-10 h-16 bg-gradient-to-b from-orange-100 to-transparent" />
                )}
                <CardHeader className="relative">
                  <CardTitle className="flex items-center justify-between text-slate-900">
                    <span>{t.name}</span>
                    {t.name === "Basic" && (
                      <Badge className="bg-orange-500 text-white border-none">
                        おすすめ
                      </Badge>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative">
                  <div className="text-3xl font-bold text-slate-900">
                    {t.price}
                    <span className="text-sm font-normal text-slate-500">
                      {" "}
                      /月
                    </span>
                  </div>
                  <div className="text-slate-600 text-sm mb-4">
                    {t.detail}
                  </div>
                  <ul className="space-y-2 text-sm text-slate-800">
                    {t.bullets.map((b, j) => (
                      <li key={j} className="flex items-start gap-2">
                        <CheckCircle2
                          className={`h-4 w-4 mt-0.5 ${
                            t.name === "Basic"
                              ? "text-orange-500"
                              : "text-sky-500"
                          }`}
                        />
                        {b}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-semibold text-slate-900">
            よくある質問
          </h2>
          <p className="text-slate-600 mt-3">
            気になるところ、お答えします。
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {faqs.map((item, i) => (
            <Card key={i} className="bg-white border border-slate-200 shadow-sm">
              <CardContent className="p-6">
                <div className="font-semibold text-slate-900 flex items-start gap-2">
                  <span className="mt-[2px] inline-flex h-6 w-6 items-center justify-center rounded-full bg-orange-50 text-orange-700 border border-orange-200 text-sm">
                    Q
                  </span>
                  <span>{item.q}</span>
                </div>
                <div className="mt-3 text-sm text-slate-600 flex items-start gap-2">
                  <span className="mt-[2px] inline-flex h-6 w-6 items-center justify-center rounded-full bg-sky-50 text-sky-700 border border-sky-200 text-sm">
                    A
                  </span>
                  <span>{item.a}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-10 text-center">
          <p className="text-sm text-slate-600 mb-3">
            「とりあえず試す」だけで大丈夫です。
          </p>
          <Button
            asChild
            className="rounded-2xl bg-orange-500 hover:bg-orange-600 text-white"
          >
            <a href="#apply">βに参加する</a>
          </Button>
          <p className="text-xs text-slate-500 mt-2">
            ※ クレジットカード登録なし。お気軽にご参加ください。
          </p>
        </div>
      </section>


      {/* β応募フォーム */}
      <section id="apply" className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold text-slate-900">
              βテスター応募
            </h2>
            <p className="text-slate-600 mt-3">
              対象：1〜50戸程度を管理しているオーナー・管理会社さま。
              「とりあえず1棟で試してみたい」という方も歓迎です。
            </p>

            <div className="mt-4 rounded-xl bg-orange-50 border border-orange-100 px-4 py-3 text-xs md:text-sm text-orange-900">
              <div className="font-semibold mb-1 flex items-center gap-1.5">
                <Sparkles className="h-4 w-4 text-orange-500" />
                β版で試せる「お金まわり」機能
              </div>
              <ul className="list-disc list-inside space-y-1">
                <li>物件ごとの家賃収入・ローン返済・固定費をメモとして登録</li>
                <li>ざっくり利回り（年間家賃 ÷ 購入価格）の目安を画面上で確認</li>
                <li>将来的な本格的収支管理（税金・修繕費など）は、β利用者の声をもとに検討</li>
              </ul>
            </div>

            <div className="mt-6 flex flex-wrap gap-3 text-sm text-slate-600">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-orange-500" />
                β期間は完全無料
              </div>
              <div className="flex items-center gap-2">
                <Globe2 className="h-4 w-4 text-sky-500" />
                アプリ不要・ブラウザで利用可能
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-slate-500" />
                連絡先：{CONTACT_EMAIL}
              </div>
            </div>
          </div>
          <Card className="bg-white border border-slate-200 shadow-sm">
            <CardContent className="p-6">
              <form onSubmit={onSubmit} className="space-y-4" noValidate>
                <div>
                  <label className="text-sm text-slate-700">お名前</label>
                  <Input
                    name="name"
                    placeholder="例）田中 太郎"
                    required
                    className="mt-1 bg-white border border-slate-300 text-slate-900 placeholder:text-slate-400 focus-visible:ring-orange-500 focus-visible:ring-offset-0"
                  />
                </div>
                <div>
                  <label className="text-sm text-slate-700">
                    メールアドレス
                  </label>
                  <Input
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    required
                    className="mt-1 bg-white border border-slate-300 text-slate-900 placeholder:text-slate-400 focus-visible:ring-orange-500 focus-visible:ring-offset-0"
                  />
                </div>
                <div>
                  <label className="text-sm text-slate-700">
                    保有戸数 / 管理戸数
                  </label>
                  <Input
                    name="units"
                    placeholder="例）12戸"
                    className="mt-1 bg-white border border-slate-300 text-slate-900 placeholder:text-slate-400 focus-visible:ring-sky-500 focus-visible:ring-offset-0"
                  />
                </div>
                <div>
                  <label className="text-sm text-slate-700">
                    導入の目的・課題（任意）
                  </label>
                  <Textarea
                    name="message"
                    placeholder="現場の困りごと・やりたいことを自由に（できれば具体的に）"
                    className="mt-1 bg-white border border-slate-300 text-slate-900 placeholder:text-slate-400 focus-visible:ring-sky-500 focus-visible:ring-offset-0"
                  />
                </div>

                {/* ハニーポット */}
                <input
                  type="text"
                  name="company"
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                />

                <Button
                  type="submit"
                  className="w-full rounded-2xl bg-orange-500 hover:bg-orange-600 text-white"
                  disabled={loading}
                >
                  {loading ? (
                    "送信中…"
                  ) : (
                    <>
                      応募する <ArrowRight className="ml-1 h-4 w-4" />
                    </>
                  )}
                </Button>
                <p className="text-[11px] text-slate-500 text-center mt-1.5">
                  送信により、利用目的の範囲内でのご連絡に同意いただいたものとみなします。
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* フッター */}
      <footer className="border-t border-slate-200 bg-white">
        <div className="max-w-6xl mx-auto px-4 py-8 grid md:grid-cols-2 gap-6">
          <div>
            <div className="text-sm text-slate-700">
              © {new Date().getFullYear()} Peripheral Nation / ResiPort
            </div>
            <div className="text-xs text-slate-500 mt-1">
              千葉・東京エリアの現場知見から生まれた、スモールオーナーのための入居者ポータル。
            </div>
          </div>
          <div className="text-sm md:text-right space-x-4 text-slate-600">
            <a
              className="hover:text-slate-900 hover:underline"
              href={`mailto:${CONTACT_EMAIL}`}
            >
              お問い合わせ
            </a>
            <a className="hover:text-slate-900 hover:underline" href="#">
              利用規約
            </a>
            <a className="hover:text-slate-900 hover:underline" href="#">
              プライバシー
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
