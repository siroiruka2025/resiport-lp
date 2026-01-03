export default function PrivacyPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-16 text-slate-800">
      <h1 className="text-2xl font-bold mb-6">プライバシーポリシー</h1>

      <p className="mb-4">
        ResiPort（以下「当サービス」）は、以下の方針に基づき、
        個人情報の適切な取り扱いと保護に努めます。
      </p>

      <h2 className="font-semibold mt-8 mb-2">1. 取得する情報</h2>
      <p className="mb-4">
        お問い合わせ・βテスター応募時に、氏名、メールアドレス、
        その他入力された情報を取得します。
      </p>

      <h2 className="font-semibold mt-8 mb-2">2. 利用目的</h2>
      <ul className="list-disc list-inside mb-4">
        <li>お問い合わせへの対応</li>
        <li>β版サービスの案内・連絡</li>
        <li>サービス改善のための参考</li>
      </ul>

      <h2 className="font-semibold mt-8 mb-2">3. 第三者提供</h2>
      <p className="mb-4">
        法令に基づく場合を除き、本人の同意なく第三者に提供しません。
      </p>

      <h2 className="font-semibold mt-8 mb-2">4. お問い合わせ</h2>
      <p>
        個人情報に関するお問い合わせは、以下までご連絡ください。<br />
        resiportapp@gmail.com
      </p>
    </main>
  );
}
