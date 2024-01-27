import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <header className={"container mx-auto mb-32"}>
        <div className={'flex gap-4 justify-between items-center mb-10'}>
            <div className={'flex gap-3 items-center'}>
                <Image
                    src={'/img/logo.png'}
                    width={'80'}
                    height={'80'}
                />
                <div className={'text-4xl font-bold'}>
                    Good Luck Group
                </div>
            </div>
            <div className={'text-4xl font-semibold'}>
                start your Business in Indonesia
            </div>
        </div>
          <div >
              <ul className={'flex gap-3 justify-around list-disc text-2xl'}>
                  <li className={''}>Company registration</li>
                  <li>Market research</li>
                  <li>Ready-made business purchase</li>
                  <li>Tax and legal services</li>
              </ul>
          </div>
      </header>
        <div className={'container mx-auto'}>
            <div className={'flex justify-center items-center text-6xl'}>
                NEW WEBSITE WILL LAUNCH SOON
            </div>
        </div>
    </main>
  );
}
