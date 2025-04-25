In this branch we plan to remove the need to use Jupyter to serve as the Kernel engine for interpretting/executing sysml code.

This will use the existing Java kernel engine but instead of using the hooks to make it a Jupyter kernel, we will create a REST-like API that will enable the "magic" commands currently used by Jupyter. These should include:

* eval
* publish
* viz


We may also want to add some functionality to manage saving and updating existing sysml code in a repository. Some of this may need to be accomplished using the SysMLAPIServer, but some of it may need to use another database application. At this point, due to familiarity, we will use the Python-based Django and its REST Framework.