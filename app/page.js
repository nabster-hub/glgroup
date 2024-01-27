import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-4 lg:p-24">
      <header className={"container mx-auto mb-32"}>
        <div className={'flex flex-col md:flex-row gap-4 justify-between md:items-center mb-10'}>
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
              <ul className={'flex flex-col p-4 lg:flex-row gap-3 justify-around list-disc text-2xl'}>
                  <li className={''}>Company registration</li>
                  <li>Market research</li>
                  <li>Ready-made business purchase</li>
                  <li>Tax and legal services</li>
              </ul>
          </div>
      </header>
        <div className={'container mx-auto'}>
            <div className={'flex text-4xl font-bold justify-center items-center md:text-6xl text-center lg:text-left md:font-normal'}>
                NEW WEBSITE WILL LAUNCH SOON
            </div>
        </div>
    </main>
  );
}
