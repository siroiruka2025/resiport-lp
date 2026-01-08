"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  CheckCircle2,
  Megaphone,
  FileText,
  MessageSquare,
  ArrowLeft,
  Smartphone,
  ShieldCheck,
} from "lucide-react";

type TicketStatus = "未対応" | "対応中" | "完了";
type Ticket = { id: string; title: string; detail: string; status: TicketStatus };
type TabKey = "tenant" | "rules" | "admin";

function TabButton({
  active,
  onClick,
  icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "flex-1 rounded-2xl border px-3 py-2 text-sm font-medium",
        "transition-colors",
        active
          ? "border-orange-200 bg-orange-50 text-orange-800"
          : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50",
      ].join(" ")}
      aria-pressed={active}
    >
      <div className="flex items-center justify-center gap-2">
        {icon}
        <span className="whitespace-nowrap">{label}</span>
      </div>
    </button>
  );
}

function StatusBadge({ status }: { status: TicketStatus }) {
  const cls =
    status === "未対応"
      ? "bg-slate-100 text-slate-700 border-slate-200"
      : status === "対応中"
      ? "bg-sky-50 text-sky-700 border-sky-200"
      : "bg-emerald-50 text-emerald-700 border-emerald-200";
  return <Badge className={cls}>{status}</Badge>;
}

export default function DemoPage() {
  const [tab, setTab] = useState<TabKey>("tenant");

  const [notice, setNotice] = useState(
    "【お知らせ】ゴミ出しは明日8:00まで。分別表は「ルール」にあります。"
  );
  const [rules, setRules] = useState(
    "ゴミ出し：可燃(火) / 不燃(金) / 資源(水)\n粗大ごみ：事前申込が必要\n夜間の騒音：22時以降はご配慮ください"
  );

  const [tickets, setTickets] = useState<Ticket[]>([
    {
      id: "T-102",
      title: "リビング照明がつかない",
      detail: "電球交換しても点かない。ブレーカー確認お願いしたい。",
      status: "未対応",
    },
    {
      id: "T-103",
      title: "浴室換気扇がうるさい",
      detail: "異音がする。掃除しても改善せず。",
      status: "対応中",
    },
  ]);

  const [newTitle, setNewTitle] = useState("");
  const [newDetail, setNewDetail] = useState("");

  const stats = useMemo(() => {
    const unread = 3; // デモなので固定
    const open = tickets.filter((t) => t.status !== "完了").length;
    return { unread, open };
  }, [tickets]);

  function addTicket() {
    if (!newTitle.trim()) return;
    setTickets((prev) => [
      {
        id: `T-${Math.floor(100 + Math.random() * 900)}`,
        title: newTitle.trim(),
        detail: newDetail.trim() || "（詳細なし）",
        status: "未対応",
      },
      ...prev,
    ]);
    setNewTitle("");
    setNewDetail("");
    setTab("admin"); // 追加したら管理タブへ誘導
  }

  function cycleStatus(id: string) {
    setTickets((prev) =>
      prev.map((t) => {
        if (t.id !== id) return t;
        const next: TicketStatus =
          t.status === "未対応" ? "対応中" : t.status === "対応中" ? "完了" : "未対応";
        return { ...t, status: next };
      })
    );
  }

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <div className="max-w-3xl mx-auto px-4 py-6">
        {/* top bar */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2">
            <Button asChild variant="outline" className="rounded-2xl">
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                LPに戻る
              </Link>
            </Button>
            <Badge className="bg-orange-50 text-orange-700 border-orange-200">
              デモ（体験版）
            </Badge>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-xs text-slate-500">
            <ShieldCheck className="h-4 w-4 text-emerald-500" />
            入力はこのページ内だけ（DB未接続）
          </div>
        </div>

        {/* title */}
        <div className="mt-4">
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <Smartphone className="h-4 w-4 text-sky-600" />
            スマホ想定：タブで画面を切り替えて体験できます
          </div>
          <h1 className="mt-1 text-2xl font-semibold">
            ResiPort デモ（30秒で雰囲気が分かる）
          </h1>
        </div>

        {/* tabs */}
        <div className="mt-4 flex gap-2">
          <TabButton
            active={tab === "tenant"}
            onClick={() => setTab("tenant")}
            icon={<Megaphone className="h-4 w-4 text-orange-500" />}
            label="入居者"
          />
          <TabButton
            active={tab === "rules"}
            onClick={() => setTab("rules")}
            icon={<FileText className="h-4 w-4 text-slate-600" />}
            label="ルール"
          />
          <TabButton
            active={tab === "admin"}
            onClick={() => setTab("admin")}
            icon={<MessageSquare className="h-4 w-4 text-sky-600" />}
            label="管理"
          />
        </div>

        {/* content */}
        <div className="mt-4 space-y-4">
          {tab === "tenant" && (
            <Card className="border-slate-200">
              <CardHeader>
                <CardTitle className="text-sm flex items-center gap-2">
                  <Megaphone className="h-4 w-4 text-orange-500" />
                  入居者向け（お知らせ）
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Textarea
                  value={notice}
                  onChange={(e) => setNotice(e.target.value)}
                  className="min-h-[140px]"
                />
                <div className="flex items-center justify-between gap-3">
                  <div className="text-xs text-slate-500">
                    ここを書き換えると「配信される文章」を体感できます
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    className="rounded-2xl"
                    onClick={() => setTab("admin")}
                  >
                    管理画面へ
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {tab === "rules" && (
            <Card className="border-slate-200">
              <CardHeader>
                <CardTitle className="text-sm flex items-center gap-2">
                  <FileText className="h-4 w-4 text-slate-600" />
                  ルール（固定表示）
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Textarea
                  value={rules}
                  onChange={(e) => setRules(e.target.value)}
                  className="min-h-[180px]"
                />
                <div className="text-xs text-slate-500">
                  「毎回の説明」をここに逃がすイメージ。入居者はいつでも見返せます。
                </div>
              </CardContent>
            </Card>
          )}

          {tab === "admin" && (
            <Card className="border-slate-200">
              <CardHeader>
                <CardTitle className="text-sm">管理者ダッシュボード（イメージ）</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* stats */}
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="rounded-2xl border border-slate-200 p-3">
                    <div className="text-xs text-slate-500">未読お知らせ</div>
                    <div className="mt-1 text-xl font-semibold text-orange-600">
                      {stats.unread}
                    </div>
                  </div>
                  <div className="rounded-2xl border border-slate-200 p-3">
                    <div className="text-xs text-slate-500">対応中チケット</div>
                    <div className="mt-1 text-xl font-semibold text-sky-600">
                      {stats.open}
                    </div>
                  </div>
                </div>

                {/* tickets */}
                <div className="space-y-2">
                  <div className="font-medium flex items-center gap-2">
                    <MessageSquare className="h-4 w-4 text-sky-600" />
                    問い合わせ（タップでステータス切替）
                  </div>

                  <div className="space-y-2">
                    {tickets.map((t) => (
                      <button
                        key={t.id}
                        onClick={() => cycleStatus(t.id)}
                        className="w-full text-left rounded-2xl border border-slate-200 p-3 hover:bg-slate-50"
                        type="button"
                      >
                        <div className="flex items-center justify-between gap-3">
                          <div className="font-medium">{t.title}</div>
                          <StatusBadge status={t.status} />
                        </div>
                        <div className="text-xs text-slate-500 mt-1">{t.id}</div>
                        <div className="text-sm text-slate-600 mt-2">{t.detail}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* add ticket */}
                <div className="rounded-2xl border border-slate-200 p-3">
                  <div className="text-xs text-slate-500 mb-2">新規問い合わせ（デモ）</div>
                  <Input
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="例）水漏れがある"
                  />
                  <Textarea
                    value={newDetail}
                    onChange={(e) => setNewDetail(e.target.value)}
                    placeholder="例）キッチン下から水が…"
                    className="mt-2 min-h-[90px]"
                  />
                  <Button
                    onClick={addTicket}
                    className="mt-2 w-full rounded-2xl bg-orange-500 hover:bg-orange-600 text-white"
                    type="button"
                  >
                    追加する <CheckCircle2 className="ml-2 h-4 w-4" />
                  </Button>

                  <div className="mt-2 text-xs text-slate-500">
                    ※このデモはDB未接続。将来は「物件/部屋/入居者」に紐づきます
                  </div>
                </div>

                {/* CTA */}
                <div className="pt-2">
                  <Button asChild className="w-full rounded-2xl bg-sky-500 hover:bg-sky-600 text-white">
                    <Link href="/#apply">このままβに参加する</Link>
                  </Button>
                  <div className="mt-2 text-center text-[11px] text-slate-500">
                    体験して「アリだな」と思ったら、ここから応募できます
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* footer note for small screens */}
        <div className="mt-4 sm:hidden flex items-center gap-2 text-xs text-slate-500">
          <ShieldCheck className="h-4 w-4 text-emerald-500" />
          入力はこのページ内だけ（DB未接続）
        </div>
      </div>
    </div>
  );
}
