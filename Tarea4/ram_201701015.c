#include <linux/init.h>
#include <linux/kernel.h>
#include <linux/module.h>
#include <linux/proc_fs.h>
#include <linux/seq_file.h>
#include <linux/mm.h>
#include <linux/slab.h>
#include <linux/mmzone.h>
#include <linux/sysinfo.h>

MODULE_LICENSE("GPL");
MODULE_DESCRIPTION("Tarea 4 de Laboratorio Sistemas Operativos 1");
MODULE_AUTHOR("Jose Carlos Moreira Paz");

#define CARNET "201701015"

static int my_proc_show(struct seq_file *m, void *v) {
    struct sysinfo si;
    si_meminfo(&si);

    seq_printf(m, "Total de RAM: %lu\n", si.totalram);
    seq_printf(m, "RAM en Uso: %lu\n", si.totalram - si.freeram);
    seq_printf(m, "RAM Libre: %lu\n", si.freeram);
    seq_printf(m, "Porcentaje de Uso: %lu%%\n", (100 * (si.totalram - si.freeram)) / si.totalram);

    return 0;
}

static int my_proc_open(struct inode *inode, struct file *file) {
    return single_open(file, my_proc_show, NULL);
}

static const struct file_operations my_proc_fops = {
    .owner = THIS_MODULE,
    .open = my_proc_open,
    .read = seq_read,
    .llseek = seq_lseek,
    .release = single_release,
};

static int __init my_module_init(void) {
    printk(KERN_INFO "Carnet: %s\n", CARNET);
    proc_create("ram_" CARNET, 0, NULL, &my_proc_fops);
    return 0;
}

static void __exit my_module_exit(void) {
    printk(KERN_INFO "Estudiante: Jose Carlos Moreira Paz\n");
    remove_proc_entry("ram_" CARNET, NULL);
}

module_init(my_module_init);
module_exit(my_module_exit);
