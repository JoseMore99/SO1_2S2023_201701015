#include <linux/module.h>
// para usar KERN_INFO
#include <linux/kernel.h>
//Header para los macros module_init y module_exit
#include <linux/init.h>
//Header necesario porque se usara proc_fs
#include <linux/proc_fs.h>
/* for copy_from_user */
#include <asm/uaccess.h>	
/* Header para usar la lib seq_file y manejar el archivo en /proc*/
#include <linux/seq_file.h>
#include <linux/mm.h>

MODULE_LICENSE("GPL");
MODULE_DESCRIPTION("Tarea 4 Laboratorio Sistemas Operativos 1");
MODULE_AUTHOR("Jose Carlos Moreira Paz");


static int escribir_archivo(struct seq_file *archivo, void *v)
{
    struct sysinfo info;
    unsigned long total_ram, free_ram, used_ram;
    int percent_used;

    si_meminfo(&info);
    total_ram = (info.totalram * info.mem_unit) >> 20; // Convert to MB
    free_ram = (info.freeram * info.mem_unit) >> 20;
    used_ram = total_ram - free_ram;
    percent_used = (used_ram * 100) / total_ram;
    seq_printf(archivo, "{\n");
    seq_printf(archivo,"\"Total_Ram\":\"%lu MB\"\n", total_ram);
    seq_printf(archivo,"\"Ram_en_uso\":\"%lu MB\"\n", used_ram);
    seq_printf(archivo,"\"Ram_libre\":\"%lu MB\"\n", free_ram);
    seq_printf(archivo,"\"Porcentaje_en_uso\":\" %d%%\"\n", percent_used);
    seq_printf(archivo, "}\n");
    return 0;
}

//Funcion que se ejecuta cuando se le hace un cat al modulo.
static int al_abrir(struct inode *inode, struct file *file)
{
    return single_open(file, escribir_archivo, NULL);
}

// Si el su Kernel es 5.6 o mayor
static struct proc_ops operaciones =
{
    .proc_open = al_abrir,
    .proc_read = seq_read
};

static int _insert(void)
{
    proc_create("ram_201701015", 0, NULL, &operaciones);
    printk(KERN_INFO "201701015\n");
    return 0;
}

static void _remove(void)
{
    remove_proc_entry("ram_201701015", NULL);
    printk(KERN_INFO "Jose Carlos Moreira Paz\n");
}

module_init(_insert);
module_exit(_remove);