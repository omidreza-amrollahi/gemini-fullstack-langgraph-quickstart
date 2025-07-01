import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { X, Settings, Brain, Search, Lightbulb, MessageSquare, LucideIcon } from "lucide-react";
import { ModelConfig } from "@/types";

interface ModelConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  modelConfig: ModelConfig;
  onSave: (config: ModelConfig) => void;
}

const OPENAI_MODELS = [
  { value: "gpt-4.1", label: "GPT-4.1", icon: Brain, color: "text-blue-400" },
  { value: "gpt-4o", label: "GPT-4o", icon: Brain, color: "text-cyan-400" },
  { value: "o4-mini", label: "o4 Mini", icon: Brain, color: "text-green-400" },
  { value: "o1", label: "o1", icon: Brain, color: "text-orange-400" },
];

const GEMINI_MODELS = [
  { value: "gemini-2.5-flash", label: "Gemini 2.5 Flash", icon: Brain, color: "text-emerald-400" },
  { value: "gemini-2.0-flash", label: "Gemini 2.0 Flash", icon: Brain, color: "text-teal-400" },
  { value: "gemini-2.5-pro", label: "Gemini 2.5 Pro", icon: Brain, color: "text-lime-400" },
];

export function ModelConfigModal({ 
  isOpen, 
  onClose, 
  modelConfig, 
  onSave 
}: ModelConfigModalProps) {
  const [config, setConfig] = useState<ModelConfig>(modelConfig);

  if (!isOpen) return null;

  const handleSave = () => {
    onSave(config);
    onClose();
  };

  const handleReset = () => {
    setConfig({
      queryGeneratorModel: "gpt-4.1",
      webSearchModel: "gemini-2.5-flash", 
      reflectionModel: "gpt-4.1",
      answerModel: "gpt-4.1"
    });
  };

  const ModelSelect = ({ 
    value, 
    onChange, 
    label, 
    description,
    icon: Icon,
    modelType = "openai"
  }: {
    value: string;
    onChange: (value: string) => void;
    label: string;
    description: string;
    icon: LucideIcon;
    modelType?: "openai" | "gemini";
  }) => {
    const modelOptions = modelType === "gemini" ? GEMINI_MODELS : OPENAI_MODELS;
    
    return (
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Icon className="h-4 w-4 text-neutral-400" />
          <label className="text-sm font-medium text-neutral-200">{label}</label>
        </div>
        <p className="text-xs text-neutral-400 mb-2">{description}</p>
        <Select value={value} onValueChange={onChange}>
          <SelectTrigger className="bg-neutral-700 border-neutral-600 text-neutral-200">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-neutral-700 border-neutral-600">
            {modelOptions.map((model) => (
              <SelectItem 
                key={model.value} 
                value={model.value}
                className="text-neutral-200 hover:bg-neutral-600 focus:bg-neutral-600"
              >
                <div className="flex items-center gap-2">
                  <model.icon className={`h-4 w-4 ${model.color}`} />
                  {model.label}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl bg-neutral-800 border-neutral-700 text-neutral-100">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Model Configuration
          </CardTitle>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-neutral-400 hover:text-neutral-200"
          >
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-sm text-neutral-400 mb-4">
            Configure which model to use for each step of the research process.
          </div>

          <ModelSelect
            value={config.queryGeneratorModel}
            onChange={(value) => setConfig(prev => ({ ...prev, queryGeneratorModel: value }))}
            label="Query Generation"
            description="Model used to generate search queries from your research topic"
            icon={Search}
            modelType="openai"
          />

          <ModelSelect
            value={config.webSearchModel}
            onChange={(value) => setConfig(prev => ({ ...prev, webSearchModel: value }))}
            label="Web Search Processing"
            description="Model used to process and analyze web search results"
            icon={Brain}
            modelType="gemini"
          />

          <ModelSelect
            value={config.reflectionModel}
            onChange={(value) => setConfig(prev => ({ ...prev, reflectionModel: value }))}
            label="Reflection & Analysis"
            description="Model used to analyze results and identify knowledge gaps"
            icon={Lightbulb}
            modelType="openai"
          />

          <ModelSelect
            value={config.answerModel}
            onChange={(value) => setConfig(prev => ({ ...prev, answerModel: value }))}
            label="Final Answer"
            description="Model used to compose the final comprehensive answer"
            icon={MessageSquare}
            modelType="openai"
          />

          <div className="flex justify-between pt-4">
            <Button
              variant="outline"
              onClick={handleReset}
              className="bg-transparent border-neutral-600 text-neutral-300 hover:bg-neutral-700"
            >
              Reset to Defaults
            </Button>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={onClose}
                className="bg-transparent border-neutral-600 text-neutral-300 hover:bg-neutral-700"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Save Configuration
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
