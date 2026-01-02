// src/app/mock/page.tsx

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail, FileText, MessageSquare, Bell } from "lucide-react";

function PhoneFrame(props: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="text-xs font-medium text-slate-600">{props.label}</div>
      <div className="relative h-[560px] w-[280px]">
        {/* iPhone風フレーム */}
        <div className="absolute inset-0 rounded-[40px] bg-slate-900 shadow-2xl" />
        {/* 画面部分 */}
        <div className="absolute inset-[10px] rounded-[32px] bg-slate-100 overflow-hidden">
          {/* ノッチっぽいところ */}
          <div className="flex justify-center mt-2 mb-1">
            <div className="h-5 w-24 rounded-full bg-slate-900/80" />
          </div>
          <div className="h-[1px] w-full bg-slate-200" />
          <div className="h-[calc(100%-32px)] overflow-hidden">{props.children}</div>
        </div>
      </div>
    </div>
  );
}

export default function MockPage() {
  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-xl font-semibold text-slate-900 mb-2">
          ResiPort UI Mock
        </h1>
        <p className="text-sm text-slate-600 mb-6">
          入居者向け画面と、オーナー向け画面のイメージモックです。
          このページをスクリーンショットして OGP などに利用してください。
        </p>

        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
          {/* 入居者側 */}
          <PhoneFrame label="入居者アプリ（例：302号室）">
            <div className="h-full bg-white">
              <div className="px-4 pt-3 pb-2">
                <div className="text-[11px] text-slate-500">物件</div>
                <div className="text-sm font-semibold text-slate-900">
                  Sunrise Hills 302
                </div>
              </div>

              <div className="px-4 space-y-3 pb-4">
                {/* ゴミ出しカード */}
                <Card className="border-slate-200 shadow-none">
                  <CardContent className="p-3">
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-xs font-medium text-slate-700">
                        ゴミ出しルール
                      </div>
                      <Badge className="bg-orange-100 text-orange-700 border-none text-[10px]">
                        いつでも確認
                      </Badge>
                    </div>
                    <div className="grid grid-cols-4 gap-2 text-[11px] text-center">
                      <div className="rounded-lg bg-slate-50 py-1">
                        <div className="text-slate-500">火</div>
                        <div className="text-[10px] text-slate-700">
                          可燃ごみ
                        </div>
                      </div>
                      <div className="rounded-lg bg-slate-50 py-1">
                        <div className="text-slate-500">木</div>
                        <div className="text-[10px] text-slate-700">
                          資源ごみ
                        </div>
                      </div>
                      <div className="rounded-lg bg-slate-50 py-1">
                        <div className="text-slate-500">金</div>
                        <div className="text-[10px] text-slate-700">
                          不燃ごみ
                        </div>
                      </div>
                      <div className="rounded-lg bg-slate-50 py-1">
                        <div className="text-slate-500">土</div>
                        <div className="text-[10px] text-slate-700">
                          粗大ごみ
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* 問い合わせカード */}
                <Card className="border-slate-200 shadow-none">
                  <CardContent className="p-3 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-xs font-medium text-slate-700">
                        <MessageSquare className="h-3.5 w-3.5 text-sky-500" />
                        設備トラブル・お問い合わせ
                      </div>
                      <span className="text-[10px] text-slate-500">
                        写真添付OK
                      </span>
                    </div>
                    <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 py-4 text-center text-[11px] text-slate-500">
                      [+] 写真を追加<br />
                      （例：水漏れ・破損箇所 など）
                    </div>
                    <div className="rounded-lg bg-slate-50 px-2.5 py-2 text-[11px] text-slate-600">
                      例）「浴室の床が一部はがれています。使用はできますが、
                      一度見ていただきたいです。」
                    </div>
                  </CardContent>
                </Card>

                {/* 取説PDFカード */}
                <Card className="border-slate-200 shadow-none">
                  <CardContent className="p-3">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-1.5 text-xs font-medium text-slate-700">
                        <FileText className="h-3.5 w-3.5 text-slate-500" />
                        設備の取扱説明書
                      </div>
                      <span className="text-[10px] text-slate-500">
                        PDFで表示
                      </span>
                    </div>
                    <div className="space-y-1.5 text-[11px] text-slate-700">
                      <div className="flex items-center justify-between">
                        <span>エアコン（リビング）</span>
                        <span className="text-slate-400 text-[10px]">
                          PDF / 3ページ
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>給湯器</span>
                        <span className="text-slate-400 text-[10px]">
                          PDF / 2ページ
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>インターネットルーター</span>
                        <span className="text-slate-400 text-[10px]">
                          PDF / 1ページ
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </PhoneFrame>

          {/* オーナー側 */}
          <PhoneFrame label="オーナー・管理画面（簡易版）">
            <div className="h-full bg-white">
              <div className="px-4 pt-3 pb-2">
                <div className="text-[11px] text-slate-500">ポータル</div>
                <div className="text-sm font-semibold text-slate-900">
                  ResiPort 管理ダッシュボード
                </div>
              </div>

              <div className="px-4 space-y-3 pb-4">
                {/* サマリー */}
                <Card className="border-slate-200 shadow-none">
                  <CardContent className="p-3">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-1.5 text-xs font-medium text-slate-700">
                        <Bell className="h-3.5 w-3.5 text-orange-500" />
                        今日のステータス
                      </div>
                      <Badge className="bg-sky-100 text-sky-700 border-none text-[10px]">
                        1〜50戸向け
                      </Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-center text-[11px]">
                      <div className="rounded-lg bg-slate-50 py-2">
                        <div className="text-slate-500">入居者</div>
                        <div className="text-sm font-semibold text-slate-900">
                          24
                        </div>
                      </div>
                      <div className="rounded-lg bg-slate-50 py-2">
                        <div className="text-slate-500">未読お知らせ</div>
                        <div className="text-sm font-semibold text-orange-500">
                          3
                        </div>
                      </div>
                      <div className="rounded-lg bg-slate-50 py-2">
                        <div className="text-slate-500">対応中</div>
                        <div className="text-sm font-semibold text-sky-500">
                          2
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* 問い合わせ管理 */}
                <Card className="border-slate-200 shadow-none">
                  <CardContent className="p-3 space-y-1.5">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-1.5 text-xs font-medium text-slate-700">
                        <MessageSquare className="h-3.5 w-3.5 text-sky-500" />
                        問い合わせ・修繕
                      </div>
                      <span className="text-[10px] text-slate-500">
                        ステータス管理
                      </span>
                    </div>
                    <div className="text-[11px] space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="truncate">
                          浴室床の剥がれ（302号室）
                        </span>
                        <Badge className="bg-sky-100 text-sky-700 border-none text-[10px]">
                          対応中
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="truncate">
                          インターネットがつながらない（205号室）
                        </span>
                        <Badge className="bg-orange-100 text-orange-700 border-none text-[10px]">
                          未対応
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="truncate">
                          ポストの鍵交換（101号室）
                        </span>
                        <Badge className="bg-emerald-100 text-emerald-700 border-none text-[10px]">
                          完了
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* お知らせ配信 */}
                <Card className="border-slate-200 shadow-none">
                  <CardContent className="p-3 space-y-1.5">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-1.5 text-xs font-medium text-slate-700">
                        <Mail className="h-3.5 w-3.5 text-orange-500" />
                        お知らせ配信履歴
                      </div>
                      <span className="text-[10px] text-slate-500">
                        物件／棟ごとに一括
                      </span>
                    </div>
                    <div className="text-[11px] space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="truncate">
                          共用部清掃のお知らせ（全戸）
                        </span>
                        <span className="text-[10px] text-slate-400">
                          既読 21 / 24
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="truncate">
                          停電点検のお知らせ（A棟）
                        </span>
                        <span className="text-[10px] text-slate-400">
                          既読 8 / 10
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* 取説PDF管理 */}
                <Card className="border-slate-200 shadow-none">
                  <CardContent className="p-3">
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-1.5 text-xs font-medium text-slate-700">
                        <FileText className="h-3.5 w-3.5 text-slate-500" />
                        取扱説明書（PDF）管理
                      </div>
                      <span className="text-[10px] text-slate-500">
                        物件ごとに紐づけ
                      </span>
                    </div>
                    <div className="text-[11px] space-y-1">
                      <div className="flex items-center justify-between">
                        <span>Sunrise Hills</span>
                        <span className="text-[10px] text-slate-400">
                          7ファイル
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Green Court</span>
                        <span className="text-[10px] text-slate-400">
                          5ファイル
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </PhoneFrame>
        </div>
      </div>
    </div>
  );
}
