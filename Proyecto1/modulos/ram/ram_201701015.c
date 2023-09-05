#include <linux/module.h>
#include <linux/init.h>
#include <linux/seq_file.h>
#include <linux/kernel.h>
#include <linux/proc_fs.h>
#include <linux/mm.h>
#include <asm/uaccess.h>

struct sysinfo i;
static int CatFile(struct seq_file *f, void *v){
    si_meminfo(&i);
    seq_printf(f, "{\n");
    seq_printf(f,"\"TotalRAM\":%8lu ,\n", i.totalram*i.mem_unit);
    seq_printf(f,"\"FreeRam\":%8lu ,\n", i.freeram*i.mem_unit);
    seq_printf(f,"\"UsedRAM\":%8lu ,\n", ((i.totalram-i.freeram)*i.mem_unit));
    seq_printf(f,"\"Percentage\": %8lu\n", ((i.totalram*100 - i.freeram*100) / i.totalram));
    seq_printf(f, "}\n");
    return 0;
}

static int ActivarCat(struct inode *inode, struct file *file){
    return single_open(file, CatFile, NULL);
}

static struct proc_ops ops ={.proc_open = ActivarCat,.proc_read = seq_read};

static int __init modulo_init(void){
    proc_create("ram_201701015", 0, NULL, &ops);
    printk(KERN_INFO "201701015\n");
    return 0;
}

static void __exit modulo_exit(void){
    remove_proc_entry("ram_201701015", NULL);
    printk(KERN_INFO "Jose Carlos Moreira Paz\n");
}

module_init(modulo_init);
module_exit(modulo_exit);

MODULE_LICENSE("GPL");
MODULE_DESCRIPTION("Módulo de información de memoria RAM en formato JSON");
MODULE_AUTHOR("Jose Carlos Moreira Paz");