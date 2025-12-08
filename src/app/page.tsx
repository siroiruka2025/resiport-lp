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

const features = [
  {
    icon: Megaphone,
    title: "お知らせ一括配信",
    text: "物件・棟単位で入居者へ即通知。履歴も自動保存。",
  },
  {
    icon: FileText,
    title: "ルール・取説PDF",
    text: "ゴミ出しや設備取扱をアプリで一元化。迷わない暮らしへ。",
  },
  {
    icon: MessageSquare,
    title: "問い合わせ・修繕",
    text: "写真付きでワンタップ報告。ステータス管理も簡単。",
  },
  {
    icon: Languages,
    title: "多言語対応",
    text: "英語・中国語から順次拡大。外国人入居者も安心。",
  },
];

const tiers = [
  {
    name: "Free",
    price: "¥0",
    detail: "1物件・広告あり",
    bullets: ["PDF 1件", "お知らせ配信", "メールサポート"],
  },
  {
    name: "Basic",
    price: "¥980",
    detail: "最大10物件",
    bullets: ["PDF無制限", "一括配信", "ブランドバナー"],
  },
  {
    name: "Pro",
    price: "¥4,980",
    detail: "多言語・チャット",
    bullets: ["多言語UI", "チャット管理", "入居者分析"],
  },
];

export default function ResiPortLanding() {
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formEl = e.currentTarget;
    const form = new FormData(formEl);

    // 必須チェック
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
      <section className="border-b border-slate-100 bg-gradient-to-b from-white via-sky-50/40 to-white">
        <div className="max-w-6xl mx-auto px-4 pt-14 pb-12">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <Badge className="mb-4 bg-orange-50 text-orange-700 border-orange-200">
                βテスター募集
              </Badge>
              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900"
              >
                小さな物件でも、
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-amber-400 to-sky-500">
                  入居者アプリは当たり前に。
                </span>
              </motion.h1>
              <p className="mt-5 text-slate-600 leading-relaxed">
                ResiPort は、1〜50戸クラスのオーナー・管理者向けに作った
                “ちょうどいい” 入居者アプリ。お知らせ、ゴミ出しルール、取扱説明書、
                問い合わせまで、LINE感覚でまとめて管理できます。
                β版では、物件ごとのざっくり利回りや収支メモも一部試験導入します。
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
            余計な機能はいらない。“これだけ”あればいい。
          </h2>
          <p className="text-slate-600 mt-3">
            ResiPort は、現場で本当に使われる最小限の機能から始めます。
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

      {/* 料金プラン（予定） */}
      <section
        id="pricing"
        className="border-y border-slate-100 bg-slate-50/70"
      >
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-semibold text-slate-900">
              料金プラン（予定）
            </h2>
            <p className="text-slate-600 mt-3">
              β期間は無料。ご意見をくださった方には、正式版で優遇プランをご案内します。
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
            {/* ★ ここに追加 */}
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
