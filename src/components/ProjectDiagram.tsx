import { useId } from 'react'
import katex from 'katex'
import 'katex/dist/katex.min.css'
import s from './ProjectDiagram.module.css'

export type ProjectDiagramVariant = 'assistant-linear' | 'mindspore-research' | 'segmentation-research'

const formulas = [
  String.raw`PE_{(pos,\,2i)} = \sin\left(\frac{pos}{10000^{2i/d_{\mathrm{model}}}}\right)`,
  String.raw`PE_{(pos,\,2i+1)} = \cos\left(\frac{pos}{10000^{2i/d_{\mathrm{model}}}}\right)`,
]

const renderedFormulas = formulas.map((formula) =>
  katex.renderToString(formula, {
    displayMode: true,
    output: 'htmlAndMathml',
    throwOnError: false,
  }),
)

const assistantStages = [
  ['Course materials', 'Slides, notes, and teaching documents'],
  ['BGE + ChromaDB', 'BGE-Large-ZH-v1.5 embedding · Top-5 retrieval'],
  ['LightRAG', 'High- and low-level graph retrieval'],
  ['DeepSeek API (R1)', 'API-backed structured grounded answer'],
] as const

const researchStages = [
  {
    title: 'Data foundation',
    detail: 'Transactions · clicks · SKU attributes',
  },
  {
    title: 'Feature signals',
    detail: 'Discount · attributes · click share',
  },
  {
    title: 'SKU taxonomy',
    detail: 'K-means baseline → imbalanced groups',
    decision: 'Quartile rules → Luxury / Cost-effective / Bargain / Other',
  },
  {
    title: 'Boundary logic',
    detail: 'Δ click share > 0.20 → decisive; otherwise ambiguous',
  },
  {
    title: 'Model search',
    detail: 'Logistic Regression · Decision Tree · Random Forest · Stacking',
    decision: 'RFE · Grid Search · Randomized Search',
  },
] as const

function AssistantDiagram({ labelId }: { labelId: string }) {
  return (
    <div className={`${s.panel} ${s.assistantPanel}`} role="group" aria-labelledby={labelId}>
      <ol className={s.pipeline} aria-label="Course assistant processing stages">
        {assistantStages.map(([title, detail], index) => (
          <li key={title}>
            <span className={s.stageNumber}>{String(index + 1).padStart(2, '0')}</span>
            <strong>{title}</strong>
            <small>{detail}</small>
          </li>
        ))}
      </ol>

      <div className={s.delivery}>
        <span className={s.deliveryLabel}>Delivery</span>
        <div className={s.outputs}>
          <div>
            <strong>Vue 3 Portal</strong>
            <small>Responsive course interface</small>
          </div>
          <div className={s.outputAccent}>
            <strong>Digital Human</strong>
            <small>Three.js · Azure TTS</small>
          </div>
        </div>
      </div>
    </div>
  )
}

function MindSporeDiagram({ labelId }: { labelId: string }) {
  return (
    <div className={`${s.panel} ${s.mindPanel}`} role="group" aria-labelledby={labelId}>
      <div className={s.studySummary}>
        <div className={s.metric}>
          <strong>128D</strong>
          <span>encoding dimensions</span>
        </div>
        <div className={s.metric}>
          <strong>50</strong>
          <span>maximum sequence length</span>
        </div>
        <div className={s.formulas} aria-label="Sinusoidal positional encoding formulas">
          {renderedFormulas.map((formula, index) => (
            <div key={formulas[index]} dangerouslySetInnerHTML={{ __html: formula }} />
          ))}
        </div>
      </div>

      <figure className={s.heatmapFigure}>
        <img
          src="/projects/mindspore-positional-encoding.webp"
          width="2400"
          height="1128"
          loading="lazy"
          decoding="async"
          alt="Original 128-dimensional sinusoidal positional encoding heatmap for sequence positions 0 through 50"
        />
        <figcaption>
          Rows represent token positions; columns represent the 128 encoding dimensions. Rapid oscillations separate
          nearby tokens, while slower bands retain longer-range order—giving self-attention deterministic access to
          sequence structure.
        </figcaption>
      </figure>
    </div>
  )
}

function SegmentationDiagram({ labelId }: { labelId: string }) {
  return (
    <div className={`${s.panel} ${s.researchPanel}`} role="group" aria-labelledby={labelId}>
      <ol className={s.researchChain} aria-label="Customer segmentation research decision chain">
        {researchStages.map((stage, index) => (
          <li key={stage.title} className={index === 2 || index === 3 ? s.researchDecision : undefined}>
            <span className={s.researchNumber}>{String(index + 1).padStart(2, '0')}</span>
            <div>
              <strong>{stage.title}</strong>
              <span>{stage.detail}</span>
              {'decision' in stage && stage.decision ? <em>{stage.decision}</em> : null}
            </div>
          </li>
        ))}
      </ol>
      <div className={s.researchSpacer} aria-hidden="true" />
      <div className={s.researchOutcome}>
        <span className={s.outcomeIntro}>
          <small>Research outcome</small>
          <strong>Interpretable SKU Taxonomy</strong>
        </span>
        <span className={s.outcomeMetric}>
          <strong>4</strong>
          <small>Balanced categories</small>
        </span>
        <p className={s.outcomeCategories}>Luxury · Cost-effective · Bargain · Other</p>
      </div>
    </div>
  )
}

type ProjectDiagramProps = {
  variant: ProjectDiagramVariant
  embedded?: boolean
  stretch?: boolean
}

export function ProjectDiagram({ variant, embedded = false, stretch = false }: ProjectDiagramProps) {
  const id = useId().replace(/:/g, '')
  const labelId = `${id}-diagram-label`
  const labels: Record<ProjectDiagramVariant, string> = {
    'assistant-linear': 'System Architecture',
    'mindspore-research': 'Positional Encoding Study',
    'segmentation-research': 'Research Decision Chain',
  }

  const diagram = variant === 'assistant-linear'
    ? <AssistantDiagram labelId={labelId} />
    : variant === 'mindspore-research'
      ? <MindSporeDiagram labelId={labelId} />
      : <SegmentationDiagram labelId={labelId} />

  return (
    <div className={`${s.root} ${embedded ? s.embeddedRoot : ''} ${stretch ? s.stretchRoot : ''}`}>
      <div id={labelId} className={s.tab}>
        {labels[variant]}
      </div>
      {diagram}
    </div>
  )
}
