import { Check } from "lucide-react";

export function RequirementsList() {
  return (
    <div className="bg-slate-100 p-6 rounded-lg mb-8">
      <h3 className="text-lg font-medium mb-4">
        For å investere må følgende være oppfylt:
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="flex items-center gap-2">
          <Check className="h-5 w-5 text-green-600" />
          <span>E-post verifisert</span>
        </div>
        <div className="flex items-center gap-2">
          <Check className="h-5 w-5 text-green-600" />
          <span>BankID autentisert</span>
        </div>
        <div className="flex items-center gap-2">
          <Check className="h-5 w-5 text-green-600" />
          <span>Over 18 år (fra BankID)</span>
        </div>
        <div className="flex items-center gap-2">
          <Check className="h-5 w-5 text-green-600" />
          <span>Adresse</span>
        </div>
        <div className="flex items-center gap-2">
          <Check className="h-5 w-5 text-green-600" />
          <span>Telefonnummer</span>
        </div>
        <div className="flex items-center gap-2">
          <Check className="h-5 w-5 text-green-600" />
          <span>Godta vilkår</span>
        </div>
        <div className="flex items-center gap-2">
          <Check className="h-5 w-5 text-green-600" />
          <span>Godta nyeste vilkår</span>
        </div>
        <div className="flex items-center gap-2">
          <Check className="h-5 w-5 text-green-600" />
          <span>Bestått hensiktsmessighetstest</span>
        </div>
      </div>
    </div>
  );
}
