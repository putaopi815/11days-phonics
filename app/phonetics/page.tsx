"use client";

import { BottomTabs } from "../../components/BottomTabs";
import { PhonemePlayButton } from "../../components/PhonemePlayButton";
import { playIpa } from "../../lib/playIpa";
import {
  vowelCategories,
  consonantCategories,
} from "../../data/phonetics";

function PhoneticsPageInner() {
  return (
    <div className="appViewport">
      <header className="pageHeader">
        <h1>音标</h1>
      </header>

      <main className="pageContent">
        <section className="card phoneticsSection">
          <div className="phoneticsSectionHead">
            <h2 className="sectionTitle">20个元音</h2>
            <div className="phoneticsLegend">
              <span className="phoneticsLegendItem mono">
                <span className="phoneticsLegendDot mono" /> 单元音
              </span>
              <span className="phoneticsLegendItem diph">
                <span className="phoneticsLegendDot diph" /> 双元音
              </span>
            </div>
          </div>
          {vowelCategories.map((cat) => (
            <div key={cat.label} className="phoneticsCategory">
              <span className="phoneticsCategoryLabel">{cat.label}</span>
              <div className="phonemeWrap">
                {cat.phonemes.map((p) => (
                  <PhonemePlayButton
                    key={p.ipa}
                    ipa={p.ipa}
                    className={`phonemeBtn vowel ${cat.kind}`}
                    onPlay={playIpa}
                  >
                    {p.ipa}
                  </PhonemePlayButton>
                ))}
              </div>
            </div>
          ))}
        </section>

        <section className="card phoneticsSection">
          <div className="phoneticsSectionHead">
            <h2 className="sectionTitle">28个辅音</h2>
            <div className="phoneticsLegend">
              <span className="phoneticsLegendItem voiceless">
                <span className="phoneticsLegendDot voiceless" /> 清辅音
              </span>
              <span className="phoneticsLegendItem voiced">
                <span className="phoneticsLegendDot voiced" /> 浊辅音
              </span>
            </div>
          </div>
          {consonantCategories.map((cat) => (
            <div key={cat.label} className="phoneticsCategory">
              <span className="phoneticsCategoryLabel">{cat.label}</span>
              <div className="phonemeWrap">
                {cat.phonemes.map((p) => (
                  <PhonemePlayButton
                    key={p.ipa}
                    ipa={p.ipa}
                    className={`phonemeBtn consonant ${p.kind}`}
                    onPlay={playIpa}
                  >
                    {p.ipa}
                  </PhonemePlayButton>
                ))}
              </div>
            </div>
          ))}
        </section>
      </main>

      <BottomTabs activeTab="phonetics" />
    </div>
  );
}

export default function PhoneticsPage() {
  return <PhoneticsPageInner />;
}
