#include <linux/module.h>
#include <linux/init.h>
#include <linux/seq_file.h>
#include <linux/kernel.h>
#include <linux/proc_fs.h>
#include <linux/mm.h>
#include <linux/sched/signal.h>
#include <linux/fs.h>
#include <linux/sched.h>
#include <asm/uaccess.h>


static int CatFile(struct seq_file *f, void *v){
    struct task_struct *task;
    struct task_struct *task_child;
    
        
    seq_printf(f, "{\n");
    seq_printf(f, "  \"Procesos\": [\n");

    for_each_process(task) {
        seq_printf(f, "    {\n");
        seq_printf(f, "      \"PID\": %d,\n", task->pid);
        seq_printf(f, "      \"Nombre\": \"%s\",\n", task->comm);
        seq_printf(f, "      \"Usuario\": \"%d\",\n", task->cred->uid);
        seq_printf(f, "      \"Estado\": %d,\n", task->__state);
        unsigned long total_ram_pages = totalram_pages();
        unsigned long rss;
        if (task->mm)
        {
            rss = get_mm_rss(task->mm) << PAGE_SHIFT;
        }
        else
        {
            rss = 0;
        }
        int porcentaje = (rss * 100) / total_ram_pages;
        seq_printf(f, "      \"RAM\": %d\n", porcentaje);

        
        seq_printf(f, "      \"Hijos\": [\n");
        list_for_each_entry(task_child, &task->children, sibling) {
            seq_printf(f, "        {\n");
            seq_printf(f, "          \"PID\": %d,\n", task_child->pid);
            seq_printf(f, "          \"Nombre\": \"%s\",\n", task_child->comm);
            seq_printf(f, "          \"Usuario\": \"%d\",\n", task_child->cred->uid);
            seq_printf(f, "          \"Estado\": %d,\n", task_child->__state);
            seq_printf(f, "          \"%%RAM\": %lu\n", task_child->mm ? task_child->mm->total_vm : 0);
            seq_printf(f, "        },\n");
        }
        seq_printf(f, "      ]\n");

        seq_printf(f, "    },\n");
    }

    seq_printf(f, "  ]\n");
    seq_printf(f, "}\n");

    return 0;
}

static int ActivarCat(struct inode *inode, struct file *file){
    return single_open(file, CatFile, NULL);
}

static struct proc_ops ops ={.proc_open = ActivarCat,.proc_read = seq_read};

static int __init modulo_init(void){
    proc_create("cpu_201701015", 0, NULL, &ops);
    printk(KERN_INFO "201701015\n");
    return 0;
}

static void __exit modulo_exit(void){
    remove_proc_entry("cpu_201701015", NULL);
    printk(KERN_INFO "Jose Carlos Moreira Paz\n");
}

module_init(modulo_init);
module_exit(modulo_exit);

MODULE_LICENSE("GPL");
MODULE_DESCRIPTION("Módulo de información de memoria RAM en formato JSON");
MODULE_AUTHOR("Jose Carlos Moreira Paz");