import { useEffect, useMemo, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Car, Heart, HeartPulse, Home, ArrowLeft, ArrowRight, Check, Send,
  Briefcase, Smartphone,
} from "lucide-react";
import { cn } from "@/lib/utils";

export type InsuranceCategory =
  | "auto"
  | "residencial"
  | "saude"
  | "vida"
  | "empresarial"
  | "celulares";

const CATEGORIES: { id: InsuranceCategory; label: string; icon: typeof Car; desc: string }[] = [
  { id: "auto", label: "Automóvel", icon: Car, desc: "Carro, moto e mais" },
  { id: "residencial", label: "Residencial", icon: Home, desc: "Casa ou apartamento" },
  { id: "saude", label: "Plano de Saúde", icon: HeartPulse, desc: "Você e sua família" },
  { id: "vida", label: "Vida", icon: Heart, desc: "Proteção para os seus" },
  { id: "empresarial", label: "Empresarial", icon: Briefcase, desc: "Para a sua empresa" },
  { id: "celulares", label: "Celulares", icon: Smartphone, desc: "Proteção do seu aparelho" },
];

const CATEGORY_LABEL: Record<InsuranceCategory, string> = {
  auto: "Seguro Automóvel",
  residencial: "Seguro Residencial",
  saude: "Plano de Saúde",
  vida: "Seguro de Vida",
  empresarial: "Seguro Empresarial",
  celulares: "Seguro de Celular",
};

type FieldDef =
  | { type: "text"; key: string; label: string; placeholder?: string; inputMode?: "text" | "numeric" | "decimal" }
  | { type: "radio"; key: string; label: string; options: string[] }
  | { type: "ages" };

const FORMS: Record<InsuranceCategory, FieldDef[]> = {
  auto: [
    { type: "text", key: "Nome completo", label: "Nome completo" },
    { type: "radio", key: "Estado civil", label: "Estado civil", options: ["Solteiro(a)", "Casado(a)", "Divorciado(a)", "Viúvo(a)", "União estável"] },
    { type: "text", key: "CPF", label: "CPF", inputMode: "numeric" },
    { type: "text", key: "CEP", label: "CEP", inputMode: "numeric" },
    { type: "radio", key: "Utilização", label: "Utilização do veículo", options: ["Passeio", "Ida ao trabalho", "Comercial", "Aplicativos"] },
    { type: "radio", key: "Condutores 18 a 25 anos", label: "Possui condutores de 18 a 25 anos?", options: ["Sim", "Não"] },
    { type: "radio", key: "Moradia", label: "Moradia", options: ["Casa", "Apartamento", "Condomínio"] },
    { type: "text", key: "Modelo do carro", label: "Modelo do carro" },
    { type: "text", key: "Ano", label: "Ano", inputMode: "numeric" },
    { type: "text", key: "Placa", label: "Placa" },
    { type: "radio", key: "Possui GNV", label: "Possui GNV?", options: ["Sim", "Não"] },
    { type: "radio", key: "Veículo Zero KM", label: "Veículo é Zero KM?", options: ["Sim", "Não"] },
    { type: "radio", key: "Veículo financiado", label: "Veículo é financiado?", options: ["Sim", "Não"] },
  ],
  residencial: [
    { type: "text", key: "Nome completo", label: "Nome completo" },
    { type: "text", key: "CPF", label: "CPF", inputMode: "numeric" },
    { type: "text", key: "Endereço", label: "Endereço" },
    { type: "text", key: "CEP", label: "CEP", inputMode: "numeric" },
    { type: "text", key: "Valor do imóvel", label: "Valor do imóvel", inputMode: "decimal", placeholder: "R$" },
  ],
  saude: [
    { type: "radio", key: "Tipo de pessoa", label: "Pessoa", options: ["Física", "Jurídica"] },
    { type: "text", key: "Profissão", label: "Profissão" },
    { type: "text", key: "Quantidade de pessoas", label: "Quantidade de pessoas", inputMode: "numeric", placeholder: "Ex: 3" },
    { type: "ages" },
    { type: "radio", key: "Acomodação", label: "Preferência de acomodação", options: ["Quarto", "Enfermaria"] },
  ],
  vida: [
    { type: "text", key: "Nome", label: "Nome" },
    { type: "text", key: "CPF", label: "CPF", inputMode: "numeric" },
    { type: "radio", key: "Estado civil", label: "Estado civil", options: ["Solteiro(a)", "Casado(a)", "Divorciado(a)", "Viúvo(a)", "União estável"] },
    { type: "text", key: "Nascimento", label: "Data de nascimento", placeholder: "DD/MM/AAAA" },
    { type: "text", key: "Endereço", label: "Endereço" },
    { type: "text", key: "Profissão", label: "Profissão" },
    { type: "text", key: "Valor da cobertura", label: "Valor da cobertura desejada", inputMode: "decimal", placeholder: "R$" },
  ],
  empresarial: [
    { type: "text", key: "CNPJ", label: "CNPJ", inputMode: "numeric" },
    { type: "text", key: "Valor da cobertura", label: "Valor da cobertura desejada", inputMode: "decimal", placeholder: "R$" },
  ],
  celulares: [
    { type: "text", key: "Nome", label: "Nome" },
    { type: "text", key: "CPF", label: "CPF", inputMode: "numeric" },
    { type: "text", key: "Endereço", label: "Endereço" },
    { type: "text", key: "Modelo do celular", label: "Modelo do celular" },
    { type: "text", key: "Valor do celular (nota fiscal)", label: "Valor do celular na nota fiscal", inputMode: "decimal", placeholder: "R$" },
  ],
};

interface QuoteModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialCategory?: InsuranceCategory | null;
}

export function QuoteModal({ open, onOpenChange, initialCategory = null }: QuoteModalProps) {
  const [step, setStep] = useState(1);
  const [category, setCategory] = useState<InsuranceCategory | null>(initialCategory);
  const [data, setData] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (open) {
      setCategory(initialCategory);
      setStep(initialCategory ? 2 : 1);
      setData({});
      setErrors({});
    }
  }, [open, initialCategory]);

  const set = (k: string, v: string) => {
    setData((d) => ({ ...d, [k]: v }));
    if (v && v.trim()) setErrors((e) => ({ ...e, [k]: false }));
  };

  const fields = useMemo<FieldDef[]>(() => (category ? FORMS[category] : []), [category]);

  const ageCount = useMemo(() => {
    const n = parseInt((data["Quantidade de pessoas"] || "").replace(/\D/g, ""), 10);
    if (!n || n < 1) return 0;
    return Math.min(n, 15);
  }, [data]);

  const validateStep2 = (): boolean => {
    const next: Record<string, boolean> = {};
    for (const f of fields) {
      if (f.type === "text" || f.type === "radio") {
        if (!data[f.key] || !data[f.key].trim()) next[f.key] = true;
      } else if (f.type === "ages") {
        for (let i = 0; i < ageCount; i++) {
          const k = `Idade pessoa ${i + 1}`;
          if (!data[k] || !data[k].trim()) next[k] = true;
        }
      }
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const goToReview = () => {
    if (validateStep2()) setStep(3);
  };

  const sendWhatsapp = () => {
    const lines = Object.entries(data)
      .filter(([, v]) => v && v.trim())
      .map(([k, v]) => `• ${k}: ${v}`)
      .join("\n");
    const msg = `Olá, vim pelo site da GpxBr Corretora! 😊\nTenho interesse em: ${category ? CATEGORY_LABEL[category] : ""}\n\nMinhas informações:\n${lines}\n\nPode me ajudar com uma cotação?`;
    const url = `https://wa.me/5521964223571?text=${encodeURIComponent(msg)}`;
    const link = document.createElement("a");
    link.href = url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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

        <div className="mb-2 flex gap-2">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={cn(
                "h-1.5 flex-1 rounded-full transition-colors",
                s <= step ? "bg-primary" : "bg-muted",
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
                    category === id ? "border-primary bg-accent" : "border-border bg-card",
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
            {fields.map((f, i) => {
              if (f.type === "text") {
                return (
                  <Field
                    key={f.key}
                    label={f.label}
                    value={data[f.key] || ""}
                    placeholder={f.placeholder}
                    inputMode={f.inputMode}
                    error={errors[f.key]}
                    onChange={(v) => set(f.key, v)}
                  />
                );
              }
              if (f.type === "radio") {
                return (
                  <RadioRow
                    key={f.key}
                    label={f.label}
                    value={data[f.key] || ""}
                    options={f.options}
                    error={errors[f.key]}
                    onChange={(v) => set(f.key, v)}
                  />
                );
              }
              // ages
              if (ageCount === 0) {
                return (
                  <p key={`ages-${i}`} className="text-xs text-muted-foreground">
                    Informe a quantidade de pessoas para detalhar as idades.
                  </p>
                );
              }
              return (
                <div key={`ages-${i}`} className="space-y-2 rounded-xl border border-border bg-accent/30 p-3">
                  <Label className="text-sm font-semibold text-navy">Idades dos beneficiários</Label>
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                    {Array.from({ length: ageCount }).map((_, idx) => {
                      const k = `Idade pessoa ${idx + 1}`;
                      return (
                        <div key={k} className="space-y-1">
                          <Label className="text-xs">Pessoa {idx + 1}</Label>
                          <Input
                            inputMode="numeric"
                            value={data[k] || ""}
                            onChange={(e) => set(k, e.target.value)}
                            className={cn(errors[k] && "border-destructive focus-visible:ring-destructive")}
                            maxLength={3}
                          />
                          {errors[k] && (
                            <p className="text-[11px] text-destructive">Obrigatório</p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}

            <div className="flex justify-between pt-2">
              <Button variant="outline" onClick={() => setStep(1)}>
                <ArrowLeft className="mr-1 h-4 w-4" /> Voltar
              </Button>
              <Button onClick={goToReview} className="bg-primary">
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

function Field({
  label, value, onChange, placeholder, inputMode, error,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  inputMode?: "text" | "numeric" | "decimal";
  error?: boolean;
}) {
  return (
    <div className="space-y-1.5">
      <Label className="text-sm">
        {label} <span className="text-destructive">*</span>
      </Label>
      <Input
        value={value}
        placeholder={placeholder}
        inputMode={inputMode}
        onChange={(e) => onChange(e.target.value)}
        maxLength={140}
        className={cn(error && "border-destructive focus-visible:ring-destructive")}
      />
      {error && <p className="text-xs text-destructive">Preencha este campo obrigatório</p>}
    </div>
  );
}

function RadioRow({
  label, options, value, onChange, error,
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
  error?: boolean;
}) {
  return (
    <div className="space-y-1.5">
      <Label className="text-sm">
        {label} <span className="text-destructive">*</span>
      </Label>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <button
            key={opt}
            type="button"
            onClick={() => onChange(opt)}
            className={cn(
              "rounded-full border px-4 py-1.5 text-sm transition-colors",
              value === opt
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-card hover:border-primary",
              error && value !== opt && "border-destructive/60",
            )}
          >
            {opt}
          </button>
        ))}
      </div>
      {error && <p className="text-xs text-destructive">Selecione uma opção</p>}
    </div>
  );
}
