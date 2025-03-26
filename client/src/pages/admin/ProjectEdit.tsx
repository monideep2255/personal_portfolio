import { useMemo } from "react";
import { useMutation } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertProjectSchema } from "@shared/schema";
import type { InsertProject } from "@shared/schema";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { ProjectPattern } from "@/components/ProjectPattern";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

const PREDEFINED_CATEGORIES = [
  "Web Development",
  "Mobile App",
  "API",
  "Data Science",
  "Machine Learning",
  "UI/UX",
  "DevOps",
  "Other"
];

export default function ProjectEdit({ params }: { params: { id: string } }) {
  const [, setLocation] = useLocation();
  const isNew = params.id === "new";

  const form = useForm<InsertProject>({
    resolver: zodResolver(insertProjectSchema),
    defaultValues: {
      title: "",
      description: "",
      githubUrl: "",
      liveUrl: "",
      featured: false,
      categories: [],
      tags: [],
      status: "draft",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: InsertProject) => {
      if (isNew) {
        await apiRequest("POST", "/api/projects", data);
      } else {
        await apiRequest("PATCH", `/api/projects/${params.id}`, data);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/projects"] });
      toast({
        title: "Success",
        description: `Project ${isNew ? "created" : "updated"} successfully`,
      });
      setLocation("/admin/projects");
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: error instanceof Error ? error.message : `Failed to ${isNew ? "create" : "update"} project`,
      });
    },
  });

  // Preview component
  const PreviewContent = useMemo(() => {
    const formData = form.getValues();
    return (
      <div className="p-6 max-w-2xl mx-auto">
        <div className="mb-6">
          <ProjectPattern
            seed={Math.floor(Math.random() * 1000)}
            title={formData.title || "Preview"}
            className="w-32 h-32 mx-auto"
          />
        </div>
        <h1 className="text-2xl font-bold mb-4">{formData.title || "Untitled Project"}</h1>
        <p className="text-muted-foreground mb-4">{formData.description || "No description provided"}</p>

        {formData.categories?.length > 0 && (
          <div className="mb-4">
            <h3 className="text-sm font-semibold mb-2">Categories:</h3>
            <div className="flex flex-wrap gap-2">
              {formData.categories.map((category) => (
                <Badge key={category} variant="secondary">{category}</Badge>
              ))}
            </div>
          </div>
        )}

        {formData.tags?.length > 0 && (
          <div className="mb-4">
            <h3 className="text-sm font-semibold mb-2">Tags:</h3>
            <div className="flex flex-wrap gap-2">
              {formData.tags.map((tag) => (
                <Badge key={tag} variant="outline">{tag}</Badge>
              ))}
            </div>
          </div>
        )}

        <div className="flex gap-4">
          {formData.githubUrl && (
            <Button variant="outline" size="sm" asChild>
              <a href={formData.githubUrl} target="_blank" rel="noopener noreferrer">View Code</a>
            </Button>
          )}
          {formData.liveUrl && (
            <Button variant="outline" size="sm" asChild>
              <a href={formData.liveUrl} target="_blank" rel="noopener noreferrer">Live Demo</a>
            </Button>
          )}
        </div>
      </div>
    );
  }, [form.watch()]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">
          {isNew ? "Create Project" : "Edit Project"}
        </h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Preview</Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl">
            {PreviewContent}
          </DialogContent>
        </Dialog>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((data) => mutation.mutate(data))}
          className="space-y-6 max-w-2xl"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="categories"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Categories</FormLabel>
                <div className="space-y-2">
                  <div className="flex flex-wrap gap-2">
                    {field.value?.map((category, index) => (
                      <Badge key={index} variant="secondary" className="flex items-center gap-1">
                        {category}
                        <button
                          type="button"
                          onClick={() => {
                            const newCategories = field.value?.filter((_, i) => i !== index);
                            field.onChange(newCategories);
                          }}
                          className="ml-1 hover:text-destructive"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                  <select
                    className="w-full p-2 border rounded-md"
                    onChange={(e) => {
                      if (e.target.value && !field.value?.includes(e.target.value)) {
                        field.onChange([...(field.value || []), e.target.value]);
                      }
                      e.target.value = "";
                    }}
                  >
                    <option value="">Add a category...</option>
                    {PREDEFINED_CATEGORIES.map((category) => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tags</FormLabel>
                <div className="space-y-2">
                  <div className="flex flex-wrap gap-2">
                    {field.value?.map((tag, index) => (
                      <Badge key={index} variant="outline" className="flex items-center gap-1">
                        {tag}
                        <button
                          type="button"
                          onClick={() => {
                            const newTags = field.value?.filter((_, i) => i !== index);
                            field.onChange(newTags);
                          }}
                          className="ml-1 hover:text-destructive"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                  <FormControl>
                    <Input
                      placeholder="Add tags (press Enter to add)"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          const input = e.currentTarget;
                          const value = input.value.trim();
                          if (value && !field.value?.includes(value)) {
                            field.onChange([...(field.value || []), value]);
                          }
                          input.value = "";
                        }
                      }}
                    />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <select
                  className="w-full p-2 border rounded-md"
                  value={field.value}
                  onChange={field.onChange}
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="githubUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>GitHub URL (optional)</FormLabel>
                <FormControl>
                  <Input
                    placeholder="https://github.com/..."
                    {...field}
                    value={field.value || ""}
                    onChange={(e) => field.onChange(e.target.value || null)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="liveUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Live URL (optional)</FormLabel>
                <FormControl>
                  <Input
                    placeholder="https://..."
                    {...field}
                    value={field.value || ""}
                    onChange={(e) => field.onChange(e.target.value || null)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="featured"
            render={({ field }) => (
              <FormItem className="flex items-center gap-2">
                <FormLabel>Featured Project</FormLabel>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex gap-4">
            <Button
              type="submit"
              disabled={mutation.isPending}
            >
              {mutation.isPending
                ? "Saving..."
                : isNew
                ? "Create Project"
                : "Update Project"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => setLocation("/admin/projects")}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}