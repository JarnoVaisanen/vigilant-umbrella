import connectDB from '@/lib/mongoose';
import Task from '@/models/Task';

// GET all tasks
export async function GET() {
  try {
    await connectDB();
    const tasks = await Task.find({}).sort({ createdAt: 1 });
    return Response.json(tasks);
  } catch (error) {
    return Response.json({ error: 'Failed to fetch tasks' }, { status: 500 });
  }
}

// POST a new task
export async function POST(request) {
  try {
    await connectDB();
    const { text } = await request.json();
    if (!text || text.trim() === '') {
      return Response.json({ error: 'Task text is required' }, { status: 400 });
    }
    const task = await Task.create({ text });
    return Response.json(task, { status: 201 });
  } catch (error) {
    return Response.json({ error: 'Failed to create task' }, { status: 500 });
  }
}

// DELETE a task
export async function DELETE(request) {
  try {
    await connectDB();
    const { id } = await request.json();
    await Task.findByIdAndDelete(id);
    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ error: 'Failed to delete task' }, { status: 500 });
  }
}

// PATCH - swap text of two tasks to reorder
export async function PATCH(request) {
  try {
    await connectDB();
    const { id1, text1, id2, text2 } = await request.json();
    await Task.findByIdAndUpdate(id1, { text: text2 });
    await Task.findByIdAndUpdate(id2, { text: text1 });
    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ error: 'Failed to reorder tasks' }, { status: 500 });
  }
}
