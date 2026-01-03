export default function TermsPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-16 text-slate-800">
      <h1 className="text-2xl font-bold mb-6">利用規約</h1>

      <p className="mb-4">
        本利用規約（以下「本規約」）は、ResiPort（以下「当サービス」）が提供する
        β版サービスの利用条件を定めるものです。
      </p>

      <h2 className="font-semibold mt-8 mb-2">第1条（適用）</h2>
      <p className="mb-4">
        本規約は、当サービスのβ版を利用するすべての利用者に適用されます。
      </p>

      <h2 className="font-semibold mt-8 mb-2">第2条（β版について）</h2>
      <p className="mb-4">
        当サービスは開発途中のβ版です。
        機能の変更、中断、終了が予告なく行われる場合があります。
      </p>

      <h2 className="font-semibold mt-8 mb-2">第3条（免責事項）</h2>
      <p className="mb-4">
        当サービスの利用により生じた損害について、
        当方は一切の責任を負いません。
      </p>

      <h2 className="font-semibold mt-8 mb-2">第4条（禁止事項）</h2>
      <ul className="list-disc list-inside mb-4">
        <li>法令または公序良俗に反する行為</li>
        <li>サービス運営を妨害する行為</li>
        <li>不正アクセス・不正利用</li>
      </ul>

      <h2 className="font-semibold mt-8 mb-2">第5条（規約の変更）</h2>
      <p className="mb-4">
        本規約は、必要に応じて変更されることがあります。
      </p>

      <h2 className="font-semibold mt-8 mb-2">お問い合わせ</h2>
      <p>
        本規約に関するお問い合わせは、以下までご連絡ください。<br />
        resiportapp@gmail.com
      </p>
    </main>
  );
}
