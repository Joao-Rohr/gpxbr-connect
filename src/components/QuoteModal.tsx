import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Car, Heart, HeartPulse, Home, ArrowLeft, ArrowRight, Check, Send } from "lucide-react";
import { cn } from "@/lib/utils";

export type InsuranceCategory = "auto" | "saude" | "vida" | "residencial";

const CATEGORIES: { id: InsuranceCategory; label: string; icon: typeof Car; desc: string }[] = [
  { id: "auto", label: "Automóvel", icon: Car, desc: "Carro, moto e mais" },
  { id: "saude", label: "Plano de Saúde", icon: HeartPulse, desc: "Você e sua família" },
  { id: "vida", label: "Vida", icon: Heart, desc: "Proteção para os seus" },
  { id: "residencial", label: "Residencial", icon: Home, desc: "Casa ou apartamento" },
];

interface QuoteModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialCategory?: InsuranceCategory | null;
}

const CATEGORY_LABEL: Record<InsuranceCategory, string> = {
  auto: "Seguro Automóvel",
  saude: "Plano de Saúde",
  vida: "Seguro de Vida",
  residencial: "Seguro Residencial",
};

export function QuoteModal({ open, onOpenChange, initialCategory = null }: QuoteModalProps) {
  const [step, setStep] = useState(1);
  const [category, setCategory] = useState<InsuranceCategory | null>(initialCategory);
  const [data, setData] = useState<Record<string, string>>({});

  useEffect(() => {
    if (open) {
      setCategory(initialCategory);
      setStep(initialCategory ? 2 : 1);
      setData({});
    }
  }, [open, initialCategory]);

  const set = (k: string, v: string) => setData((d) => ({ ...d, [k]: v }));

  const sendWhatsapp = () => {
    const fields = Object.entries(data)
      .filter(([, v]) => v && v.trim())
      .map(([k, v]) => `• ${k}: ${v}`)
      .join("\n");
    const msg = `Olá, vim pelo site da GpxBr Corretora! 😊\nTenho interesse em: ${category ? CATEGORY_LABEL[category] : ""}\n\nMinhas informações:\n${fields}\n\nPode me ajudar com uma cotação?`;
    window.open(`https://wa.me/5521964223571?text=${encodeURIComponent(msg)}`, "_blank");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[92vh] overflow-y-auto sm:max-w-xl">
        <DialogHeader>
          <DialogTitle className="text-2xl text-navy">Cotação rápida</DialogTitle>
          <DialogDescription>
            Etapa {step} de 3 — responda algumas perguntas e enviamos sua cotação pelo WhatsApp.
          </DialogDescription>
        </DialogHeader>

        {/* Progress */}
        <div className="mb-2 flex gap-2">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={cn(
                "h-1.5 flex-1 rounded-full transition-colors",
                s <= step ? "bg-primary" : "bg-muted"
              )}
            />
          ))}
        </div>

        {step === 1 && (
          <div>
            <p className="mb-4 text-sm font-medium text-foreground">Qual seguro você precisa?</p>
            <div className="grid grid-cols-2 gap-3">
              {CATEGORIES.map(({ id, label, icon: Icon, desc }) => (
                <button
                  key={id}
                  onClick={() => {
                    setCategory(id);
                    setStep(2);
                  }}
                  className={cn(
                    "flex flex-col items-start gap-2 rounded-xl border-2 p-4 text-left transition-all hover:border-primary hover:shadow-card",
                    category === id ? "border-primary bg-accent" : "border-border bg-card"
                  )}
                >
                  <div className="rounded-lg bg-primary/10 p-2 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-semibold text-navy">{label}</div>
                    <div className="text-xs text-muted-foreground">{desc}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && category && (
          <div className="space-y-3">
            <Field label="Nome completo" value={data.nome || ""} onChange={(v) => set("Nome", v)} />
            {category === "auto" && (
              <>
                <Field label="Marca / Modelo do carro" onChange={(v) => set("Veículo", v)} />
                <Field label="Ano do veículo" onChange={(v) => set("Ano", v)} />
                <Field label="CEP de pernoite" onChange={(v) => set("CEP", v)} />
                <RadioRow label="Possui garagem?" onChange={(v) => set("Garagem", v)} options={["Sim", "Não"]} />
                <RadioRow label="Já tem seguro atual?" onChange={(v) => set("Seguro atual", v)} options={["Sim", "Não"]} />
              </>
            )}
            {category === "saude" && (
              <>
                <Field label="Quantidade de pessoas" onChange={(v) => set("Pessoas", v)} />
                <Field label="Faixa etária dos beneficiários" onChange={(v) => set("Faixa etária", v)} />
                <Field label="Cidade / Estado" onChange={(v) => set("Cidade/Estado", v)} />
                <RadioRow label="Tem plano atual?" onChange={(v) => set("Plano atual", v)} options={["Sim", "Não"]} />
              </>
            )}
            {category === "vida" && (
              <>
                <Field label="Idade" onChange={(v) => set("Idade", v)} />
                <RadioRow label="Tem dependentes?" onChange={(v) => set("Dependentes", v)} options={["Sim", "Não"]} />
                <RadioRow
                  label="Valor de cobertura desejado"
                  onChange={(v) => set("Cobertura", v)}
                  options={["Até R$ 100 mil", "R$ 100–500 mil", "Acima de R$ 500 mil"]}
                />
              </>
            )}
            {category === "residencial" && (
              <>
                <RadioRow label="Tipo de imóvel" onChange={(v) => set("Tipo", v)} options={["Casa", "Apartamento"]} />
                <RadioRow label="Próprio ou alugado?" onChange={(v) => set("Posse", v)} options={["Próprio", "Alugado"]} />
                <Field label="CEP" onChange={(v) => set("CEP", v)} />
              </>
            )}

            <div className="flex justify-between pt-2">
              <Button variant="outline" onClick={() => setStep(1)}>
                <ArrowLeft className="mr-1 h-4 w-4" /> Voltar
              </Button>
              <Button onClick={() => setStep(3)} className="bg-primary">
                Continuar <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {step === 3 && category && (
          <div className="space-y-4">
            <div className="rounded-xl border bg-accent/40 p-4">
              <div className="mb-2 text-sm font-semibold text-navy">Resumo</div>
              <div className="mb-2 text-sm">
                <span className="text-muted-foreground">Seguro: </span>
                <span className="font-medium">{CATEGORY_LABEL[category]}</span>
              </div>
              <ul className="space-y-1 text-sm">
                {Object.entries(data)
                  .filter(([, v]) => v && v.trim())
                  .map(([k, v]) => (
                    <li key={k} className="flex gap-2">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <span>
                        <span className="text-muted-foreground">{k}: </span>
                        <span className="font-medium">{v}</span>
                      </span>
                    </li>
                  ))}
              </ul>
            </div>
            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setStep(2)}>
                <ArrowLeft className="mr-1 h-4 w-4" /> Voltar
              </Button>
              <Button onClick={sendWhatsapp} className="bg-whatsapp text-whatsapp-foreground hover:bg-whatsapp/90">
                <Send className="mr-2 h-4 w-4" /> Enviar para o WhatsApp
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

function Field({ label, value, onChange }: { label: string; value?: string; onChange: (v: string) => void }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-sm">{label}</Label>
      <Input defaultValue={value} onChange={(e) => onChange(e.target.value)} maxLength={120} />
    </div>
  );
}

function RadioRow({ label, options, onChange }: { label: string; options: string[]; onChange: (v: string) => void }) {
  const [selected, setSelected] = useState<string | null>(null);
  return (
    <div className="space-y-1.5">
      <Label className="text-sm">{label}</Label>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <button
            key={opt}
            type="button"
            onClick={() => {
              setSelected(opt);
              onChange(opt);
            }}
            className={cn(
              "rounded-full border px-4 py-1.5 text-sm transition-colors",
              selected === opt
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-card hover:border-primary"
            )}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}
